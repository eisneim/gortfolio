var _ = require('lodash');
/**
 *        Grid item type
 *   ----  --------  ----   --------
 *   |   | |     |  |   |  |         |
 *   |   | |     |  |   |  |         |
 *                  |   |  |         |
 *                  |   |  |         |
 *     1      2       3         4
 * 1.base squre
 * 2.width>height, width == 2*base
 * 3.height>width,
 * 4. width == 2*base, height == 2*base
 */

function Grid(opt) {
    
    // options 
    this.itemLength = opt.itemLength;
    this.gridWidth = opt.gridWidth || opt.gridWidth;
    this.minItemWidth = opt.minItemWidth || 200;
    this.gutter = opt.gutter || 10;

};

Grid.prototype.setUp = function() {
    /**
     * setting up the virtual grid
     */
    this.virtual = [];

    this.columns = Math.floor(this.gridWidth / this.minItemWidth);
    this.baseWidth = this.gridWidth / this.columns - this.gutter;

    var row = Math.ceil(this.itemLength * 4 / this.columns);
    for (var ii = 0; ii < row; ii++) {
        var rowOfItems = [];
        for (var jj = 0; jj < this.columns; jj++) {
            rowOfItems.push({
                top: ii * (this.baseWidth + this.gutter), // y value
                left: jj * (this.baseWidth + this.gutter), // x value
                isOccupied: false,
            });
        }
        this.virtual.push(rowOfItems);
    }; // end of outter for loop
    // pointer of virtual grid 
    this.currentRow = 0;
    this.currentColumn = 0;
    this.currentType = 1;

    console.log('total colums:' + this.columns);
    console.log('baseWidth:' + this.baseWidth);
}

Grid.prototype.checkSize = function(type, col) {
    if (type == 2 || type == 4) {
        var isOutofEdge = (col + 1) > this.columns;
        var isCoverOther = true;
        if ((col + 1) < this.columns) {
            isCoverOther = this.virtual[this.currentRow][col + 1].isOccupied;
        }

        return !isOutofEdge && !isCoverOther;

    } else {
        return true;
    }

}
Grid.prototype.walkVirtualGrid = function() {
        var col = this.currentColumn;
        var row = this.currentRow;
        var totalCol = this.columns;

        // first check if this one is occupied
        while (this.virtual[row][col].isOccupied) {
            col++;
            if (col >= this.columns) {
                col = 0;
                row++;
            }
            // console.log('col:'+col);
            // console.log('row:'+row);
        }
        // check if this item fit in;
        while (!this.checkSize(this.currentType, col)) {
            this.currentType = Math.ceil(Math.random() * 2) * 2 - 1; // 1, 3

            // console.log('currentType is:'+ this.currentType );
        }

        var itemType = this.currentType;

        var startVirtualItem = this.virtual[row][col];

        switch (itemType) {
            case 1:
                this.virtual[row][col].isOccupied = true;
                col++;
                break;
            case 2:
                this.virtual[row][col].isOccupied = true;
                this.virtual[row][col + 1].isOccupied = true;
                col += 2;
                break;
            case 3:
                this.virtual[row][col].isOccupied = true;
                this.virtual[row + 1][col].isOccupied = true;

                col++;
                break;
            case 4:
                this.virtual[row][col].isOccupied = true;
                this.virtual[row][col + 1].isOccupied = true;
                this.virtual[row + 1][col].isOccupied = true;
                this.virtual[row + 1][col + 1].isOccupied = true;

                col += 2;
                break;
        };

        if (col >= this.columns) {
            col = 0;
            row++;
        }


        this.currentColumn = col;
        this.currentRow = row;

        return startVirtualItem;
    },
    Grid.prototype.positionOneItem = function() {
        this.currentType = Math.ceil(Math.random() * 4);

        var virtualItem = this.walkVirtualGrid();

        // console.log(virtualItem);

        return {
            top: virtualItem.top,
            left: virtualItem.left,
        }
    },

    Grid.prototype.fill = function() {
        var self = this;

        this.setUp();

        var itemStyles = [];
        for (var ii = 0; ii < this.itemLength; ii++) {
            var pos = self.positionOneItem();

            var width, height;
            switch (self.currentType) {
                case 1:
                    width = self.baseWidth;
                    height = self.baseWidth;
                    break;
                case 2:
                    width = self.baseWidth * 2 + self.gutter;
                    height = self.baseWidth;
                    break;
                case 3:
                    width = self.baseWidth;
                    height = self.baseWidth * 2 + self.gutter;
                    break;
                case 4:
                    width = self.baseWidth * 2 + self.gutter;
                    height = self.baseWidth * 2 + self.gutter;
                    break;
            }

            var itemStyle = {
                width: width,
                height: height,
                top: pos.top,
                left: pos.left,
            };

            itemStyles.push(itemStyle);

        }; // end of for
        return itemStyles;
    }
Grid.prototype.refill = function(){
    this.gridWidth = window.innerWidth - 20;
    return this.fill();
}

Grid.prototype.deBouncedRefill = function(){
    return _.debounce( this.refill.bind(this) , 200);
}



module.exports = function(option) {
    return new Grid(option);
}