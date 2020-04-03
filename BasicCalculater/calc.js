var stack = new Array();
var display = 0;

function testing() {
    document.getElementById("testing").innerHTML = "display: " + display + "<br>" + "; stack: " + stack;
}

function clickNum(num) {
    display = display * 10 + num;
    document.getElementById("display").innerHTML = display;
    testing();
}

function clickOp(op) {
    stack.push(display, op);
    display = 0;
    testing();
    // if (typeof stack.slice(-1)[0] == 'string') {
    //     stack.slice(-1)[0] = op;
    // }
    // else {
    //     stack += [display];
    //     stack += [op];
    //     display = 0;
    // }
}

function clickEq() {
    stack.push(display);
    testing();
    display = resolveStack(stack);
    stack = [display];
    document.getElementById("display").innerHTML = display;
}

function allClear() {
    display = 0;
    stack = [];
    document.getElementById("display").innerHTML = display;
}

//expects array of either length 0, or of odd number of elements, numbers alternating with ops
function resolveStack(stack) {
    if (stack.length === 0) {
        return 0;
    }
    else if (stack.length === 1) {
        return stack[0];
    }
    else {
        var newNum = resolveStack(stack.slice(0,stack.length - 2));
        if (stack.slice(-2)[0] === "x") {
            return newNum * stack.slice(-1)[0];
        }
        else if (stack.slice(-2)[0] === "/") {
            return newNum / stack.slice(-1)[0];
        }
        else if (stack.slice(-2)[0] === "+") {
            return newNum + stack.slice(-1)[0];
        }
        else if (stack.slice(-2)[0] === "-") {
            return newNum - stack.slice(-1)[0];
        }
        else {
            return 0;
        }
    }
}
