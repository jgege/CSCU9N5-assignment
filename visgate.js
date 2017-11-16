var visGate = visGate || {};
(function(module) {
    var canvasId = '';
    var gameElementImages = {};
    var numberOfGameElementSprite = 0;
    var numberOfGameElementSpriteLoaded = 0;
    var assetsLoaded = false;
    var network;
    var nodes;
    var edges;
    var options = {
        interaction: {
            hover:true,
            dragNodes: true,
            dragView: false
        },
        manipulation: {
            enabled: true,
            initiallyActive: true,
            deleteNode: false,
            addNode: false,
            addEdge: function(edgeData,callback) {
                var fromNode;
                var toNode;
                if (edgeData.from !== edgeData.to) {
                    fromNode = nodes.get(edgeData.from);
                    toNode = nodes.get(edgeData.to);

                    if (fromNode.gateNodeType !== toNode.gateNodeType) {
                        if (!edgeExists(edgeData)) {
                            var fromNodeEdgeCount = getEdgesOfNode(fromNode.id).length;
                            var toNodeEdgeCount = getEdgesOfNode(toNode.id).length;
                            var fromNodeMaxEdge = getMaxEdgeNumberOfNode(fromNode);
                            var toNodeMaxEdge = getMaxEdgeNumberOfNode(toNode);

                            if (fromNodeEdgeCount < fromNodeMaxEdge && toNodeEdgeCount < toNodeMaxEdge) {
                                callback(edgeData);
                            } else {
                                console.log("The node has too many edges.");
                            }
                        } else {
                            console.log("Edge exists already.");
                        }
                    } else {
                        console.log("You can't connect same type of nodes to eachother.");
                    }
                } else {
                    console.log("Can't connect a node to itself.");
                }
            },
            deleteEdge: function(data, callback) {
                var filteredEdges = [];
                for (var i = 0; i < data['edges'].length; i++) {
                    var edgeInfo = edges.get(data['edges'][i]);
                    if (!edgeInfo.fixed) {
                        filteredEdges.push(data['edges'][i])
                    }
                }
                data['edges'] = filteredEdges;

                if (data['edges'].length < 1) {
                    console.log("You can't delete that edge.");
                }
                callback(data);
            }
        },
        edges: {
            smooth: false,
               color: {
                color:'black',
                highlight:'red',
                hover: 'yellow',
                inherit: false,
                opacity:1.0
              },
        },
        nodes: {
            shape: 'square',
            size: 10
        },
        physics: {
            enabled: false,
        }
    };
    
    function checkResult()
    {
        var allSourceNodes = nodes.get().filter(function (node) {
            return (node.gateNodeType === 'output' && node.signal === true);
        });

        checkStepForward(allSourceNodes, 0);
    }

    function checkStepForward(localNodeList, step) {
        console.log(step);
        console.log(localNodeList);
        var nextStepNodes = [];
        var nextStepNodeIdList = [];
        var movedForward = false;

        // Signal moves to the next element
        for (var nodeIndex in localNodeList) {
            var node = localNodeList[nodeIndex];
            var edges = getEdgesOfNode(node.id);
            for (var edgeIndex in edges) {
                var edge = edges[edgeIndex];
                var nextNodeId = (edge.to === node.id) ? edge.from : edge.to;
                var nextNode = nodes.get(nextNodeId);

                var withinGameElement = (node.gameElementId === nextNode.gameElementId);
                var notCached = (nextStepNodeIdList.indexOf(nextNodeId) === -1);
                var movesWithinAGate = (withinGameElement && node.gateNodeType === 'input' && nextNode.gateNodeType === 'output');
                var movesBetweenElements = (!withinGameElement && node.gateNodeType === 'output' && nextNode.gateNodeType === 'input');

                if (notCached && (movesWithinAGate || movesBetweenElements)) {
                    if (movesWithinAGate) {
                        var gateType = nextNode.gateType;

                        if(gateType !== 'not') {
                            var inputA = nodes.get(nextNodeId-2);
                        }
                        var inputB = nodes.get(nextNodeId-1);

                        // Both input signals are active
                        if ((gateType === 'not')? (inputB.activeSignal === true) : (inputA.activeSignal === true && inputB.activeSignal === true)) {
                            if (gateType === 'and') {
                                nextNode.signal = (inputA.signal && inputB.signal);
                                movedForward = true;
                            } else if(gateType === 'nand') {
                                nextNode.signal = !(inputA.signal && inputB.signal);
                                movedForward = true;
                            } else if(gateType === 'or') {
                                nextNode.signal = (inputA.signal || inputB.signal);
                                movedForward = true;
                            } else if(gateType === 'nor') {
                                nextNode.signal = !(inputA.signal || inputB.signal);
                                movedForward = true;
                            } else if(gateType === 'not') {
                                nextNode.signal = !(inputB.signal);
                                movedForward = true;
                            } else if(gateType === 'xor') {
                                nextNode.signal = ((inputA.signal || inputB.signal) && !(inputA.signal && inputB.signal));
                                movedForward = true;
                            } else {
                                console.log("Unknown gate type.");
                            }

                            if (movedForward) {
                                nextNode.activeSignal = true;
                                nextNode.label = (nextNode.signal)? "1" : "0";
                                nodes.update(nextNode);
                                if(gateType !== 'not') {
                                    inputA.activeSignal = false;
                                    nodes.update(inputA);
                                }
                                inputB.activeSignal = false;
                                nodes.update(inputB);
                                nextStepNodeIdList.push(nextNodeId);
                                nextStepNodes.push(nextNode);
                            }
                        }
                    } else {
                        nextNode.signal = node.signal;
                        nextNode.activeSignal = true;
                        nextNode.label = (nextNode.signal)? "1" : "0";
                        node.activeSignal = false;
                        movedForward = true;
                        nextStepNodeIdList.push(nextNodeId);
                        nextStepNodes.push(nextNode);
                        nodes.update(node);
                        nodes.update(nextNode);
                    }
                }

            }

            if (node.gateType === undefined) {
                node.activeSignal = false;
            }

            if (edges.length === 0) {
                nodes.update(node);
            }
        }

        // Signal stays in place
        for (var nodeIndex in localNodeList) {
            var node = localNodeList[nodeIndex];
            var notCached = (nextStepNodeIdList.indexOf(nextNodeId) === -1);
            if (node.activeSignal === true) {
                nextStepNodeIdList.push(nodeIndex);
                nextStepNodes.push(node);
            }
        }
        /*
        console.log(nextStepNodes);
        console.log(movedForward);
        */
        if (nextStepNodes.length === 0 || movedForward === false) {
            return false;
        }
        return checkStepForward(nextStepNodes, (step+1));
    }

    function getEdgesOfNode(nodeId) {
        return edges.get().filter(function (edge) {
            return edge.from === nodeId || edge.to === nodeId;
        });
    }

    function getMaxEdgeNumberOfNode(node) {
        var maxEdgeCount = 0;
        if (node.maxEdgeCount > 0) {
            maxEdgeCount = node.maxEdgeCount;
        } else {
            if (node.gateNodeEndpoint === true) {
                maxEdgeCount = 1;
            } else {
                maxEdgeCount = (node.gateNodeType === "output") ? 3 : 2;
            }
        }

        return maxEdgeCount;
    }

    function edgeExists(edgeData) {
        var nodeAId = edgeData.from;
        var nodeBId = edgeData.to;

        var edgeList = edges.get().filter(function (edge) {
            return (edge.from === nodeAId && edge.to === nodeBId) || ((edge.from === nodeBId && edge.to === nodeAId));
        });

        return edgeList.length > 0;
    }

    // source + display
    function createNodesAndEdgesFromMiscElement(element, nodeId) {
        return {
            nodes: [
                {
                    id: nodeId, 
                    gateNodeType: ((element.type === 'source')? 'output' : 'input'), 
                    gateNodeEndpoint: true, 
                    fixed: true,
                    x: element.x, 
                    y: element.y,
                    color: ((element.type === 'source')? "red" : "yellow"),
                    signal: (element.type === 'source') ? true : false,
                    activeSignal: (element.type === 'source') ? true : false,
                    label: (element.type === 'source') ? "1" : "",
                    gameElementId: element.id
                }
            ],
            edges: []
        };
    }

    // gates
    function createNodesAndEdgesFromGateElement(element, nodeId) {
        var nodes = [];
        var edges = [];
        if (element.subtype !== 'not') { // only the "NOT gate" has 1 input and 1 output
            nodes.push({
                id: nodeId, 
                gateNodeType: 'input', 
                gateNodeEndpoint: false, 
                gateType: element.subtype,
                fixed: true,
                x: element.x-40, 
                y: element.y-25,
                color: "yellow",
                activeSignal: false,
                gameElementId: element.id
            });
            nodes.push({
                id: nodeId+1, 
                gateNodeType: 'input', 
                gateNodeEndpoint: false, 
                gateType: element.subtype,
                fixed: true,
                x: element.x-40, 
                y: element.y+25,
                color: "yellow",
                activeSignal: false,
                gameElementId: element.id
            });
            nodes.push({
                id: nodeId+2, 
                gateNodeType: 'output', 
                gateNodeEndpoint: false, 
                gateType: element.subtype,
                fixed: true,
                x: element.x+35, 
                y: element.y,
                color: "red",
                activeSignal: false,
                gameElementId: element.id
            });

            edges.push({
                fixed: true, 
                from: nodeId, 
                to: nodeId+2, 
                hidden: true,
                gameElementId: element.id
            });

            edges.push({
                fixed: true, 
                from: nodeId+1, 
                to: nodeId+2, 
                hidden: true,
                gameElementId: element.id
            });
        } else {
            // "NOT gate"
            nodes.push({
                id: nodeId, 
                gateNodeType: 'input', 
                gateNodeEndpoint: false, 
                gateType: element.subtype,
                fixed: true,
                x: element.x-50, 
                y: element.y,
                color: "yellow",
                activeSignal: false,
                gameElementId: element.id
            });
            nodes.push({
                id: nodeId+1, 
                gateNodeType: 'output', 
                gateNodeEndpoint: false, 
                gateType: element.subtype,
                fixed: true,
                x: element.x+50, 
                y: element.y,
                color: "red",
                activeSignal: false,
                gameElementId: element.id
            });
            edges.push({
                fixed: true, 
                from: nodeId, 
                to: nodeId+1, 
                hidden: true,
                gameElementId: element.id
            });
        }

        return {
            nodes: nodes,
            edges: edges
        };
    }

    function createNodesAndEdgesFromGameElements(elements) {
        var nodeId = 0;
        var nodes = [];
        var edges = [];
        var tempResult = [];

        var i = 0;
        var j = 0;

        for (i = 0; i < elements.length; i++) {
            tempResult = [];
            if (elements[i].type === 'source' || elements[i].type === 'display') {
                tempResult = createNodesAndEdgesFromMiscElement(elements[i], nodeId);
                nodeId += tempResult['nodes'].length;
            } else if(elements[i].type === 'gate') {
                tempResult = createNodesAndEdgesFromGateElement(elements[i], nodeId);
                nodeId += tempResult['nodes'].length;
            } else {
                console.log('Unknown game element type: ' + elements[i].type);
            }

            if (tempResult) {
                elements[i]['nodesAndEdges'] = tempResult;
                // merge nodes
                for (j = 0; j < tempResult['nodes'].length; j++) {
                    nodes.push(tempResult['nodes'][j]);
                }
                // merge edges
                for (j = 0; j < tempResult['edges'].length; j++) {
                    edges.push(tempResult['edges'][j]);
                }
            }
        }

        return {"nodes": nodes, "edges": edges};
    }

    function loadLevel(gameElements) {
        var nodesAndEdges = createNodesAndEdgesFromGameElements(gameElements);
        nodes = new vis.DataSet(nodesAndEdges['nodes']);
        edges = new vis.DataSet(nodesAndEdges['edges']);

        // create a network
        var container = document.getElementById(canvasId);
        var data = {
            nodes: nodes,
            edges: edges
        };
        
        console.log("Network is being initialised.");
        network = new vis.Network(container, data, options);

        network.on("afterDrawing", function (ctx) {
            var i = 0;
            var element;
            for (i = 0; i < gameElements.length; i++) {
                element = gameElements[i];

                if (element.type === 'gate') {
                    var elementImage = gameElementImages[element.subtype];
                    var scaleBy = 200;
                    var oHeight = elementImage.height;
                    var oWidth = elementImage.width;
                    var imageRatio = oHeight / oWidth;
                    ctx.drawImage(elementImage, element.x - oWidth, element.y - oHeight, scaleBy, scaleBy * imageRatio);
                }
            }
        });
    }
    
    function loadAssets() {
        var gameElementSpriteFolder = 'images/game_elements/';
        var gameElementSpriteList = {
            and: 'and.svg',
            nand: 'nand.svg',
            nor: 'nor.svg',
            not: 'not.svg',
            or: 'or.svg',
            xnor: 'xnor.svg',
            xor: 'xor.svg',
            endpoint: 'endpoint.png',
            source: 'source.png'
        };

        var img;
        for (var elementName in gameElementSpriteList) {
            if (gameElementSpriteList.hasOwnProperty(elementName)) {
                img = new Image;
                img.src = gameElementSpriteFolder + gameElementSpriteList[elementName];
                img.addEventListener("load", function() {
                    numberOfGameElementSpriteLoaded++;
                    console.log("Image loaded");
                });
                img.addEventListener("error", function() {
                    console.log("Error during loading an image.");
                });
                gameElementImages[elementName] = img;
                numberOfGameElementSprite++;
            }
        }
    }
    
    function waitUntilAssetsLoaded(callback) {
        if (numberOfGameElementSprite > numberOfGameElementSpriteLoaded) {
            console.log("Waiting for assets to load.");
            setTimeout((function(){waitUntilAssetsLoaded(callback)}), 500);
            return;
        }
        assetsLoaded = true;
        callback();
    }

    function init(cId, levelData) {
        canvasId = cId;
        loadAssets();
        waitUntilAssetsLoaded((function(){loadLevel(levelData)}));
    }
    
    module.init = init;
    module.checkResult = checkResult;
    module.loadLevel = loadLevel;
}(visGate));