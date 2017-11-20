var vislGateLevelOrder = ['lvl1', 'lvl2', 'lvl3'];

var vislGateLevels = {
    lvl1:{ // Level 1
        levelTitle: 'A simple start',
        levelDescription: 'Mauris non nisi nec velit semper fringilla ut eu dui. Sed sagittis magna quis vestibulum scelerisque. Suspendisse a volutpat magna. Morbi fringilla scelerisque finibus. Vestibulum accumsan auctor ullamcorper. Duis dapibus nibh sit amet nulla tristique imperdiet. Suspendisse congue mi non purus blandit suscipit. Duis eget metus felis. Nulla ut suscipit est, a semper lorem. Nam ut nisl felis.',
        level: [
            {id: 1, type: 'source', x: 0, y: 50, signal: true, slotName: 'Slot - A'},
            {id: 2, type: 'source', x: 0, y: 150, signal: false, slotName: 'Slot - B'},
            {id: 3, type: 'gate', subtype: 'empty', x: 250, y: 100, slotName: 'Slot - 1'},
            {id: 4, type: 'display', x: 550, y: 100, slotName: 'Output'},
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
    lvl2:{ // Level 2
        levelTitle: 'Orand',
        levelDescription: 'Mauris non nisi nec velit semper fringilla ut eu dui. Sed sagittis magna quis vestibulum scelerisque. Suspendisse a volutpat magna. Morbi fringilla scelerisque finibus. Vestibulum accumsan auctor ullamcorper. Duis dapibus nibh sit amet nulla tristique imperdiet. Suspendisse congue mi non purus blandit suscipit. Duis eget metus felis. Nulla ut suscipit est, a semper lorem. Nam ut nisl felis.',
        level: [
            {id: 1, type: 'source', x: 0, y: 50, signal: true, slotName: 'Slot - A'},
            {id: 2, type: 'source', x: 0, y: 150, signal: false, slotName: 'Slot - B'},
            {id: 3, type: 'source', x: 0, y: 250, signal: true, slotName: 'Slot - C'},
            {id: 4, type: 'gate', subtype: 'empty', x: 150, y: 100, slotName: 'Slot - 1'},
            {id: 5, type: 'gate', subtype: 'empty', x: 350, y: 200, slotName: 'Slot - 2'},
            {id: 6, type: 'display', x: 550, y: 200, slotName: 'Output'},
            
        ],
        truthTable:[
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 0}, // source
                {id: 3, signal: 0}, // source
                {id: 6, signal: 0}  // display
            ],
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 0}, // source
                {id: 3, signal: 1}, // source
                {id: 6, signal: 0}  // display
            ],
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 1}, // source
                {id: 3, signal: 0}, // source
                {id: 6, signal: 0}  // display
            ],
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 1}, // source
                {id: 3, signal: 1}, // source
                {id: 6, signal: 1}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 0}, // source
                {id: 3, signal: 0}, // source
                {id: 6, signal: 0}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 0}, // source
                {id: 3, signal: 1}, // source
                {id: 6, signal: 1}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 1}, // source
                {id: 3, signal: 0}, // source
                {id: 6, signal: 0}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 1}, // source
                {id: 3, signal: 1}, // source
                {id: 6, signal: 1}  // display
            ],
        ]
    },
    lvl3:{ // Level 3
        levelTitle: 'Notandor',
        levelDescription: 'Mauris non notandor nisi nec velit semper fringilla ut eu dui. Sed sagittis magna quis vestibulum scelerisque. Suspendisse a volutpat magna. Morbi fringilla scelerisque finibus. Vestibulum accumsan auctor ullamcorper. Duis dapibus nibh sit amet nulla tristique imperdiet. Suspendisse congue mi non purus blandit suscipit. Duis eget metus felis. Nulla ut suscipit est, a semper lorem. Nam ut nisl felis.',
        level: [
            {id: 1, type: 'source', x: 0, y: 50, signal: false, slotName: 'Slot - A'},
            {id: 2, type: 'source', x: 0, y: 150, signal: true, slotName: 'Slot - B'},
            {id: 3, type: 'source', x: 0, y: 250, signal: false, slotName: 'Slot - C'},
            {id: 4, type: 'gate', subtype: 'empty', x: 150, y: 100, slotName: 'Slot - 1'},
            {id: 5, type: 'gate', subtype: 'empty', x: 150, y: 250, slotName: 'Slot - 2'},
            {id: 6, type: 'gate', subtype: 'empty', x: 350, y: 250, slotName: 'Slot - 3'},
            {id: 7, type: 'display', x: 550, y: 200, slotName: 'Output'},
            
        ],
        truthTable:[
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 0}, // source
                {id: 3, signal: 0}, // source
                {id: 7, signal: 1}  // display
            ],
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 0}, // source
                {id: 3, signal: 1}, // source
                {id: 7, signal: 1}  // display
            ],
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 1}, // source
                {id: 3, signal: 0}, // source
                {id: 7, signal: 1}  // display
            ],
            [
                {id: 1, signal: 0}, // source
                {id: 2, signal: 1}, // source
                {id: 3, signal: 1}, // source
                {id: 7, signal: 1}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 0}, // source
                {id: 3, signal: 0}, // source
                {id: 7, signal: 0}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 0}, // source
                {id: 3, signal: 1}, // source
                {id: 7, signal: 0}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 1}, // source
                {id: 3, signal: 0}, // source
                {id: 7, signal: 0}  // display
            ],
            [
                {id: 1, signal: 1}, // source
                {id: 2, signal: 1}, // source
                {id: 3, signal: 1}, // source
                {id: 7, signal: 1}  // display
            ],
        ]
    },
};