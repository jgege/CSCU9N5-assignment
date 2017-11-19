var visGateLevels = {
    lvl1:{ // Level 1
        level: [
            {id: 1, type: 'source', x: 0, y: 50, signal: true, slotName: 'Slot - A'},
            {id: 2, type: 'source', x: 0, y: 150, signal: true, slotName: 'Slot - B'},
            {id: 3, type: 'gate', subtype: 'and', x: 150, y: 100},
            {id: 4, type: 'display', x: 550, y: 100},
            {id: 5, type: 'gate', subtype: 'empty', x: 350, y: 100, slotName: 'Slot - 1'},
        ],
        truthTable:[
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 1}, // source
                {id: 4, signal: 1}  // display
            ],
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 1}, // source
                {id: 4, signal: 0}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 0}, // source
                {id: 4, signal: 0}  // display
            ],
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 0}, // source
                {id: 4, signal: 0}  // display
            ],
        ]
    },
    lvl2:{ // Level 1
        level: [
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
        ],
        truthTable:[
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 1}, // source
                {id: 4, signal: 1}  // display
            ]
        ]
    },
};