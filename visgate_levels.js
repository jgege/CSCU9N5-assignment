var visGateLevels = [
    [ // Level 1
        {id: 1, type: 'source', x: 0, y: 50},
        {id: 2, type: 'source', x: 0, y: 150},
        {id: 3, type: 'gate', subtype: 'and', x: 150, y: 100},
        {id: 4, type: 'display', x: 550, y: 100},
        {id: 5, type: 'gate', subtype: 'not', x: 350, y: 100},
    ],
    [ // Level 2
        {id: 1, type: 'source', x: 0, y: 50},
        {id: 2, type: 'source', x: 0, y: 150},
        {id: 3, type: 'gate', subtype: 'and', x: 150, y: 100},
        {id: 6, type: 'gate', subtype: 'nand', x: 150, y: 200},
        {id: 5, type: 'display', x: 550, y: 100},
        {id: 4, type: 'gate', subtype: 'or', x: 150, y: 300},
        {id: 7, type: 'gate', subtype: 'nor', x: 150, y: 400},
        {id: 10, type: 'gate', subtype: 'xor', x: 150, y: 500},
        {id: 9, type: 'gate', subtype: 'xnor', x: 150, y: 600},
        {id: 8, type: 'gate', subtype: 'not', x: 350, y: 100},
    ]
];