/* eslint-disable */
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || from);
}

/**
 * Rounds number to given decimal
 * eg. roundNumber(2.34343, 1) => 2.3
 */
var roundNumber = function (num, decimal) {
    return Number(num.toFixed(decimal));
};
/**
 * Checks if value is number, if not it returns default value
 * 1# eg. checkIsNumber(2, 30) => 2
 * 2# eg. checkIsNumber(null, 30) => 30
 */
var checkIsNumber = function (num, defaultValue) {
    return typeof num === "number" ? num : defaultValue;
};

var handleCallback = function (context, event, callback) {
    if (callback && typeof callback === "function") {
        callback(context, event);
    }
};

/**
 * Functions should return denominator of the target value, which is the next animation step.
 * t is a value from 0 to 1, reflecting the percentage of animation status.
 */
var easeOut = function (t) {
    return -Math.cos(t * Math.PI) / 2 + 0.5;
};
// linear
var linear = function (t) {
    return t;
};
// accelerating from zero velocity
var easeInQuad = function (t) {
    return t * t;
};
// decelerating to zero velocity
var easeOutQuad = function (t) {
    return t * (2 - t);
};
// acceleration until halfway, then deceleration
var easeInOutQuad = function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
// accelerating from zero velocity
var easeInCubic = function (t) {
    return t * t * t;
};
// decelerating to zero velocity
var easeOutCubic = function (t) {
    return --t * t * t + 1;
};
// acceleration until halfway, then deceleration
var easeInOutCubic = function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
// accelerating from zero velocity
var easeInQuart = function (t) {
    return t * t * t * t;
};
// decelerating to zero velocity
var easeOutQuart = function (t) {
    return 1 - --t * t * t * t;
};
// acceleration until halfway, then deceleration
var easeInOutQuart = function (t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
// accelerating from zero velocity
var easeInQuint = function (t) {
    return t * t * t * t * t;
};
// decelerating to zero velocity
var easeOutQuint = function (t) {
    return 1 + --t * t * t * t * t;
};
// acceleration until halfway, then deceleration
var easeInOutQuint = function (t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};
var animations = {
    easeOut: easeOut,
    linear: linear,
    easeInQuad: easeInQuad,
    easeOutQuad: easeOutQuad,
    easeInOutQuad: easeInOutQuad,
    easeInCubic: easeInCubic,
    easeOutCubic: easeOutCubic,
    easeInOutCubic: easeInOutCubic,
    easeInQuart: easeInQuart,
    easeOutQuart: easeOutQuart,
    easeInOutQuart: easeInOutQuart,
    easeInQuint: easeInQuint,
    easeOutQuint: easeOutQuint,
    easeInOutQuint: easeInOutQuint,
};

var handleCancelAnimationFrame = function (animation) {
    if (typeof animation === "number") {
        cancelAnimationFrame(animation);
    }
};
var handleCancelAnimation = function (contextInstance) {
    if (!contextInstance.mounted)
        return;
    handleCancelAnimationFrame(contextInstance.animation);
    // Clear animation state
    contextInstance.animate = false;
    contextInstance.animation = null;
    contextInstance.velocity = null;
};
function handleSetupAnimation(contextInstance, animationName, animationTime, callback) {
    if (!contextInstance.mounted)
        return;
    var startTime = new Date().getTime();
    var lastStep = 1;
    // if another animation is active
    handleCancelAnimation(contextInstance);
    // new animation
    contextInstance.animation = function () {
        if (!contextInstance.mounted) {
            return handleCancelAnimationFrame(contextInstance.animation);
        }
        var frameTime = new Date().getTime() - startTime;
        var animationProgress = frameTime / animationTime;
        var animationType = animations[animationName];
        var step = animationType(animationProgress);
        if (frameTime >= animationTime) {
            callback(lastStep);
            contextInstance.animation = null;
        }
        else if (contextInstance.animation) {
            callback(step);
            requestAnimationFrame(contextInstance.animation);
        }
    };
    requestAnimationFrame(contextInstance.animation);
}
function animate(contextInstance, targetState, animationTime, animationName) {
    var isValid = isValidTargetState(targetState);
    if (!contextInstance.mounted || !isValid)
        return;
    var setTransformState = contextInstance.setTransformState;
    var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
    var scaleDiff = targetState.scale - scale;
    var positionXDiff = targetState.positionX - positionX;
    var positionYDiff = targetState.positionY - positionY;
    if (animationTime === 0) {
        setTransformState(targetState.scale, targetState.positionX, targetState.positionY);
    }
    else {
        // animation start timestamp
        handleSetupAnimation(contextInstance, animationName, animationTime, function (step) {
            var newScale = scale + scaleDiff * step;
            var newPositionX = positionX + positionXDiff * step;
            var newPositionY = positionY + positionYDiff * step;
            setTransformState(newScale, newPositionX, newPositionY);
        });
    }
}
function isValidTargetState(targetState) {
    var scale = targetState.scale, positionX = targetState.positionX, positionY = targetState.positionY;
    if (isNaN(scale) || isNaN(positionX) || isNaN(positionY)) {
        return false;
    }
    return true;
}

function getComponentsSizes(wrapperComponent, contentComponent, newScale) {
    var wrapperWidth = wrapperComponent.offsetWidth;
    var wrapperHeight = wrapperComponent.offsetHeight;
    var contentWidth = contentComponent.offsetWidth;
    var contentHeight = contentComponent.offsetHeight;
    var newContentWidth = contentWidth * newScale;
    var newContentHeight = contentHeight * newScale;
    var newDiffWidth = wrapperWidth - newContentWidth;
    var newDiffHeight = wrapperHeight - newContentHeight;
    return {
        wrapperWidth: wrapperWidth,
        wrapperHeight: wrapperHeight,
        newContentWidth: newContentWidth,
        newDiffWidth: newDiffWidth,
        newContentHeight: newContentHeight,
        newDiffHeight: newDiffHeight,
    };
}
var getBounds = function (wrapperWidth, newContentWidth, diffWidth, wrapperHeight, newContentHeight, diffHeight, centerZoomedOut) {
    var scaleWidthFactor = wrapperWidth > newContentWidth
        ? diffWidth * (centerZoomedOut ? 1 : 0.5)
        : 0;
    var scaleHeightFactor = wrapperHeight > newContentHeight
        ? diffHeight * (centerZoomedOut ? 1 : 0.5)
        : 0;
    var minPositionX = wrapperWidth - newContentWidth - scaleWidthFactor;
    var maxPositionX = scaleWidthFactor;
    var minPositionY = wrapperHeight - newContentHeight - scaleHeightFactor;
    var maxPositionY = scaleHeightFactor;
    return { minPositionX: minPositionX, maxPositionX: maxPositionX, minPositionY: minPositionY, maxPositionY: maxPositionY };
};
var calculateBounds = function (contextInstance, newScale) {
    var wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    var centerZoomedOut = contextInstance.setup.centerZoomedOut;
    if (!wrapperComponent || !contentComponent) {
        throw new Error("Components are not mounted");
    }
    var _a = getComponentsSizes(wrapperComponent, contentComponent, newScale), wrapperWidth = _a.wrapperWidth, wrapperHeight = _a.wrapperHeight, newContentWidth = _a.newContentWidth, newDiffWidth = _a.newDiffWidth, newContentHeight = _a.newContentHeight, newDiffHeight = _a.newDiffHeight;
    var bounds = getBounds(wrapperWidth, newContentWidth, newDiffWidth, wrapperHeight, newContentHeight, newDiffHeight, Boolean(centerZoomedOut));
    return bounds;
};
var handleCalculateBounds = function (contextInstance, newScale) {
    var bounds = calculateBounds(contextInstance, newScale);
    // Save bounds
    contextInstance.bounds = bounds;
    return bounds;
};
function getMouseBoundedPosition(positionX, positionY, bounds, limitToBounds, paddingValueX, paddingValueY, wrapperComponent) {
    var minPositionX = bounds.minPositionX, minPositionY = bounds.minPositionY, maxPositionX = bounds.maxPositionX, maxPositionY = bounds.maxPositionY;
    var paddingX = 0;
    var paddingY = 0;
    if (wrapperComponent) {
        paddingX = paddingValueX;
        paddingY = paddingValueY;
    }
    var x = boundLimiter(positionX, minPositionX - paddingX, maxPositionX + paddingX, limitToBounds);
    var y = boundLimiter(positionY, minPositionY - paddingY, maxPositionY + paddingY, limitToBounds);
    return { x: x, y: y };
}
/**
 * Keeps value between given bounds, used for limiting view to given boundaries
 * 1# eg. boundLimiter(2, 0, 3, true) => 2
 * 2# eg. boundLimiter(4, 0, 3, true) => 3
 * 3# eg. boundLimiter(-2, 0, 3, true) => 0
 * 4# eg. boundLimiter(10, 0, 3, false) => 10
 */
var boundLimiter = function (value, minBound, maxBound, isActive) {
    if (!isActive)
        return roundNumber(value, 2);
    if (value < minBound)
        return roundNumber(minBound, 2);
    if (value > maxBound)
        return roundNumber(maxBound, 2);
    return roundNumber(value, 2);
};

function handleCalculateZoomPositions(contextInstance, mouseX, mouseY, newScale, bounds, limitToBounds) {
    var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
    var scaleDifference = newScale - scale;
    if (typeof mouseX !== "number" || typeof mouseY !== "number") {
        console.error("Mouse X and Y position were not provided!");
        return { x: positionX, y: positionY };
    }
    var calculatedPositionX = positionX - mouseX * scaleDifference;
    var calculatedPositionY = positionY - mouseY * scaleDifference;
    // do not limit to bounds when there is padding animation,
    // it causes animation strange behaviour
    var newPositions = getMouseBoundedPosition(calculatedPositionX, calculatedPositionY, bounds, limitToBounds, 0, 0, null);
    return newPositions;
}
function checkZoomBounds(zoom, minScale, maxScale, zoomPadding, enablePadding) {
    var scalePadding = enablePadding ? zoomPadding : 0;
    var minScaleWithPadding = minScale - scalePadding;
    if (!isNaN(maxScale) && zoom >= maxScale)
        return maxScale;
    if (!isNaN(minScale) && zoom <= minScaleWithPadding)
        return minScaleWithPadding;
    return zoom;
}

var isPanningStartAllowed = function (contextInstance, event) {
    var excluded = contextInstance.setup.panning.excluded;
    var isInitialized = contextInstance.isInitialized, wrapperComponent = contextInstance.wrapperComponent;
    var target = event.target;
    var isWrapperChild = wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.contains(target);
    var isAllowed = isInitialized && target && isWrapperChild;
    if (!isAllowed)
        return false;
    var isExcluded = isExcludedNode(target, excluded);
    if (isExcluded)
        return false;
    return true;
};
var isPanningAllowed = function (contextInstance) {
    var isInitialized = contextInstance.isInitialized, isPanning = contextInstance.isPanning, setup = contextInstance.setup;
    var disabled = setup.panning.disabled;
    var isAllowed = isInitialized && isPanning && !disabled;
    if (!isAllowed)
        return false;
    return true;
};
var handlePanningSetup = function (contextInstance, event) {
    var _a = contextInstance.transformState, positionX = _a.positionX, positionY = _a.positionY;
    contextInstance.isPanning = true;
    // Panning with mouse
    var x = event.clientX;
    var y = event.clientY;
    contextInstance.startCoords = { x: x - positionX, y: y - positionY };
};
var handleTouchPanningSetup = function (contextInstance, event) {
    var touches = event.touches;
    var _a = contextInstance.transformState, positionX = _a.positionX, positionY = _a.positionY;
    contextInstance.isPanning = true;
    // Panning with touch
    var oneFingerTouch = touches.length === 1;
    if (oneFingerTouch) {
        var x = touches[0].clientX;
        var y = touches[0].clientY;
        contextInstance.startCoords = { x: x - positionX, y: y - positionY };
    }
};
function handlePanToBounds(contextInstance) {
    var _a = contextInstance.transformState, positionX = _a.positionX, positionY = _a.positionY, scale = _a.scale;
    var _b = contextInstance.setup, disabled = _b.disabled, limitToBounds = _b.limitToBounds, centerZoomedOut = _b.centerZoomedOut;
    var wrapperComponent = contextInstance.wrapperComponent;
    if (disabled || !wrapperComponent || !contextInstance.bounds)
        return;
    var _c = contextInstance.bounds, maxPositionX = _c.maxPositionX, minPositionX = _c.minPositionX, maxPositionY = _c.maxPositionY, minPositionY = _c.minPositionY;
    var xChanged = positionX > maxPositionX || positionX < minPositionX;
    var yChanged = positionY > maxPositionY || positionY < minPositionY;
    var mousePosX = positionX > maxPositionX
        ? wrapperComponent.offsetWidth
        : contextInstance.setup.minPositionX || 0;
    var mousePosY = positionY > maxPositionY
        ? wrapperComponent.offsetHeight
        : contextInstance.setup.minPositionY || 0;
    var _d = handleCalculateZoomPositions(contextInstance, mousePosX, mousePosY, scale, contextInstance.bounds, limitToBounds || centerZoomedOut), x = _d.x, y = _d.y;
    return {
        scale: scale,
        positionX: xChanged ? x : positionX,
        positionY: yChanged ? y : positionY,
    };
}
function handleNewPosition(contextInstance, newPositionX, newPositionY, paddingValueX, paddingValueY) {
    var limitToBounds = contextInstance.setup.limitToBounds;
    var wrapperComponent = contextInstance.wrapperComponent, bounds = contextInstance.bounds;
    var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
    var hasPositionXChanged = newPositionX !== positionX;
    var hasPositionYChanged = newPositionY !== positionY;
    var hasNewPosition = !hasPositionXChanged || !hasPositionYChanged;
    if (!wrapperComponent || hasNewPosition || !bounds) {
        return;
    }
    var _b = getMouseBoundedPosition(newPositionX, newPositionY, bounds, limitToBounds, paddingValueX, paddingValueY, wrapperComponent), x = _b.x, y = _b.y;
    contextInstance.setTransformState(scale, x, y);
}
var getPanningClientPosition = function (contextInstance, clientX, clientY) {
    var startCoords = contextInstance.startCoords, transformState = contextInstance.transformState;
    var panning = contextInstance.setup.panning;
    var lockAxisX = panning.lockAxisX, lockAxisY = panning.lockAxisY;
    var positionX = transformState.positionX, positionY = transformState.positionY;
    if (!startCoords) {
        return { x: positionX, y: positionY };
    }
    var mouseX = clientX - startCoords.x;
    var mouseY = clientY - startCoords.y;
    var newPositionX = lockAxisX ? positionX : mouseX;
    var newPositionY = lockAxisY ? positionY : mouseY;
    return { x: newPositionX, y: newPositionY };
};
var getPaddingValue = function (contextInstance, size) {
    var setup = contextInstance.setup, transformState = contextInstance.transformState;
    var scale = transformState.scale;
    var minScale = setup.minScale;
    if (size > 0 && scale >= minScale) {
        return size;
    }
    return 0;
};

var isVelocityCalculationAllowed = function (contextInstance) {
    var mounted = contextInstance.mounted;
    var _a = contextInstance.setup, disabled = _a.disabled, velocityAnimation = _a.velocityAnimation;
    var scale = contextInstance.transformState.scale;
    var disabledVelocity = velocityAnimation.disabled;
    var isAllowed = !disabledVelocity || scale > 1 || !disabled || mounted;
    if (!isAllowed)
        return false;
    return true;
};
var isVelocityAllowed = function (contextInstance) {
    var mounted = contextInstance.mounted, velocity = contextInstance.velocity, bounds = contextInstance.bounds;
    var _a = contextInstance.setup, disabled = _a.disabled, velocityAnimation = _a.velocityAnimation;
    var scale = contextInstance.transformState.scale;
    var disabledVelocity = velocityAnimation.disabled;
    var isAllowed = !disabledVelocity || scale > 1 || !disabled || mounted;
    if (!isAllowed)
        return false;
    if (!velocity || !bounds)
        return false;
    return true;
};
function getVelocityMoveTime(contextInstance, velocity) {
    var velocityAnimation = contextInstance.setup.velocityAnimation;
    var equalToMove = velocityAnimation.equalToMove, animationTime = velocityAnimation.animationTime, sensitivity = velocityAnimation.sensitivity;
    if (equalToMove) {
        return animationTime * velocity * sensitivity;
    }
    return animationTime;
}
function getVelocityPosition(newPosition, startPosition, currentPosition, isLocked, limitToBounds, minPosition, maxPosition, minTarget, maxTarget, step) {
    if (limitToBounds) {
        if (startPosition > maxPosition && currentPosition > maxPosition) {
            var calculatedPosition = maxPosition + (newPosition - maxPosition) * step;
            if (calculatedPosition > maxTarget)
                return maxTarget;
            if (calculatedPosition < maxPosition)
                return maxPosition;
            return calculatedPosition;
        }
        if (startPosition < minPosition && currentPosition < minPosition) {
            var calculatedPosition = minPosition + (newPosition - minPosition) * step;
            if (calculatedPosition < minTarget)
                return minTarget;
            if (calculatedPosition > minPosition)
                return minPosition;
            return calculatedPosition;
        }
    }
    if (isLocked)
        return startPosition;
    return boundLimiter(newPosition, minPosition, maxPosition, limitToBounds);
}

function getSizeMultiplier(wrapperComponent, equalToMove) {
    var defaultMultiplier = 1;
    if (equalToMove) {
        return Math.min(defaultMultiplier, wrapperComponent.offsetWidth / window.innerWidth);
    }
    return defaultMultiplier;
}
function handleCalculateVelocity(contextInstance, position) {
    var isAllowed = isVelocityCalculationAllowed(contextInstance);
    if (!isAllowed) {
        return;
    }
    var lastMousePosition = contextInstance.lastMousePosition, velocityTime = contextInstance.velocityTime, setup = contextInstance.setup;
    var wrapperComponent = contextInstance.wrapperComponent;
    var equalToMove = setup.velocityAnimation.equalToMove;
    var now = Date.now();
    if (lastMousePosition && velocityTime && wrapperComponent) {
        var sizeMultiplier = getSizeMultiplier(wrapperComponent, equalToMove);
        var distanceX = position.x - lastMousePosition.x;
        var distanceY = position.y - lastMousePosition.y;
        var velocityX = distanceX / sizeMultiplier;
        var velocityY = distanceY / sizeMultiplier;
        var interval = now - velocityTime;
        var speed = distanceX * distanceX + distanceY * distanceY;
        var velocity = Math.sqrt(speed) / interval;
        contextInstance.velocity = { velocityX: velocityX, velocityY: velocityY, total: velocity };
    }
    contextInstance.lastMousePosition = position;
    contextInstance.velocityTime = now;
}
function handleVelocityPanning(contextInstance) {
    var velocity = contextInstance.velocity, bounds = contextInstance.bounds, setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent;
    var isAllowed = isVelocityAllowed(contextInstance);
    if (!isAllowed || !velocity || !bounds || !wrapperComponent) {
        return;
    }
    var velocityX = velocity.velocityX, velocityY = velocity.velocityY, total = velocity.total;
    var maxPositionX = bounds.maxPositionX, minPositionX = bounds.minPositionX, maxPositionY = bounds.maxPositionY, minPositionY = bounds.minPositionY;
    var limitToBounds = setup.limitToBounds, alignmentAnimation = setup.alignmentAnimation;
    var zoomAnimation = setup.zoomAnimation, panning = setup.panning;
    var lockAxisY = panning.lockAxisY, lockAxisX = panning.lockAxisX;
    var animationType = zoomAnimation.animationType;
    var sizeX = alignmentAnimation.sizeX, sizeY = alignmentAnimation.sizeY, velocityAlignmentTime = alignmentAnimation.velocityAlignmentTime;
    var alignAnimationTime = velocityAlignmentTime;
    var moveAnimationTime = getVelocityMoveTime(contextInstance, total);
    var finalAnimationTime = Math.max(moveAnimationTime, alignAnimationTime);
    var paddingValueX = getPaddingValue(contextInstance, sizeX);
    var paddingValueY = getPaddingValue(contextInstance, sizeY);
    var paddingX = (paddingValueX * wrapperComponent.offsetWidth) / 100;
    var paddingY = (paddingValueY * wrapperComponent.offsetHeight) / 100;
    var maxTargetX = maxPositionX + paddingX;
    var minTargetX = minPositionX - paddingX;
    var maxTargetY = maxPositionY + paddingY;
    var minTargetY = minPositionY - paddingY;
    var startState = contextInstance.transformState;
    var startTime = new Date().getTime();
    handleSetupAnimation(contextInstance, animationType, finalAnimationTime, function (step) {
        var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
        var frameTime = new Date().getTime() - startTime;
        var animationProgress = frameTime / alignAnimationTime;
        var alignAnimation = animations[alignmentAnimation.animationType];
        var alignStep = 1 - alignAnimation(Math.min(1, animationProgress));
        var customStep = 1 - step;
        var newPositionX = positionX + velocityX * customStep;
        var newPositionY = positionY + velocityY * customStep;
        var currentPositionX = getVelocityPosition(newPositionX, startState.positionX, positionX, lockAxisX, limitToBounds, minPositionX, maxPositionX, minTargetX, maxTargetX, alignStep);
        var currentPositionY = getVelocityPosition(newPositionY, startState.positionY, positionY, lockAxisY, limitToBounds, minPositionY, maxPositionY, minTargetY, maxTargetY, alignStep);
        if (positionX !== newPositionX || positionY !== newPositionY) {
            contextInstance.setTransformState(scale, currentPositionX, currentPositionY);
        }
    });
}

function handlePanningStart(contextInstance, event) {
    var scale = contextInstance.transformState.scale;
    handleCancelAnimation(contextInstance);
    handleCalculateBounds(contextInstance, scale);
    if (event.touches) {
        handleTouchPanningSetup(contextInstance, event);
    }
    else {
        handlePanningSetup(contextInstance, event);
    }
}
function handlePanning(contextInstance, clientX, clientY) {
    var startCoords = contextInstance.startCoords, setup = contextInstance.setup;
    var _a = setup.alignmentAnimation, sizeX = _a.sizeX, sizeY = _a.sizeY;
    if (!startCoords)
        return;
    var _b = getPanningClientPosition(contextInstance, clientX, clientY), x = _b.x, y = _b.y;
    var paddingValueX = getPaddingValue(contextInstance, sizeX);
    var paddingValueY = getPaddingValue(contextInstance, sizeY);
    handleCalculateVelocity(contextInstance, { x: x, y: y });
    handleNewPosition(contextInstance, x, y, paddingValueX, paddingValueY);
}
function handlePanningEnd(contextInstance) {
    if (contextInstance.isPanning) {
        var velocityDisabled = contextInstance.setup.panning.velocityDisabled;
        var velocity = contextInstance.velocity, wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
        contextInstance.isPanning = false;
        contextInstance.animate = false;
        contextInstance.animation = null;
        var wrapperRect = wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.getBoundingClientRect();
        var contentRect = contentComponent === null || contentComponent === void 0 ? void 0 : contentComponent.getBoundingClientRect();
        var wrapperWidth = (wrapperRect === null || wrapperRect === void 0 ? void 0 : wrapperRect.width) || 0;
        var wrapperHeight = (wrapperRect === null || wrapperRect === void 0 ? void 0 : wrapperRect.height) || 0;
        var contentWidth = (contentRect === null || contentRect === void 0 ? void 0 : contentRect.width) || 0;
        var contentHeight = (contentRect === null || contentRect === void 0 ? void 0 : contentRect.height) || 0;
        var isZoomed = wrapperWidth < contentWidth || wrapperHeight < contentHeight;
        var shouldAnimate = !velocityDisabled && velocity && (velocity === null || velocity === void 0 ? void 0 : velocity.total) > 0.1 && isZoomed;
        if (shouldAnimate) {
            handleVelocityPanning(contextInstance);
        }
        else {
            handleAlignToBounds(contextInstance);
        }
    }
}
function handleAlignToBounds(contextInstance) {
    var scale = contextInstance.transformState.scale;
    var _a = contextInstance.setup, minScale = _a.minScale, alignmentAnimation = _a.alignmentAnimation;
    var disabled = alignmentAnimation.disabled, sizeX = alignmentAnimation.sizeX, sizeY = alignmentAnimation.sizeY, animationTime = alignmentAnimation.animationTime, animationType = alignmentAnimation.animationType;
    var isDisabled = disabled || scale < minScale || (!sizeX && !sizeY);
    if (isDisabled)
        return;
    var targetState = handlePanToBounds(contextInstance);
    if (targetState) {
        animate(contextInstance, targetState, animationTime, animationType);
    }
}

function handleAlignToScaleBounds(contextInstance, mousePositionX, mousePositionY) {
    var scale = contextInstance.transformState.scale;
    var wrapperComponent = contextInstance.wrapperComponent;
    var _a = contextInstance.setup, minScale = _a.minScale, limitToBounds = _a.limitToBounds, zoomAnimation = _a.zoomAnimation;
    var disabled = zoomAnimation.disabled, animationTime = zoomAnimation.animationTime, animationType = zoomAnimation.animationType;
    var isDisabled = disabled || scale >= minScale;
    if (scale >= 1 || limitToBounds) {
        // fire fit to bounds animation
        handleAlignToBounds(contextInstance);
    }
    if (isDisabled || !wrapperComponent || !contextInstance.mounted)
        return;
    var mouseX = mousePositionX || wrapperComponent.offsetWidth / 2;
    var mouseY = mousePositionY || wrapperComponent.offsetHeight / 2;
    var targetState = handleZoomToPoint(contextInstance, minScale, mouseX, mouseY);
    if (targetState) {
        animate(contextInstance, targetState, animationTime, animationType);
    }
}
function handleZoomToPoint(contextInstance, scale, mouseX, mouseY) {
    var _a = contextInstance.setup, minScale = _a.minScale, maxScale = _a.maxScale, limitToBounds = _a.limitToBounds;
    var newScale = checkZoomBounds(roundNumber(scale, 2), minScale, maxScale, 0, false);
    var bounds = handleCalculateBounds(contextInstance, newScale);
    var _b = handleCalculateZoomPositions(contextInstance, mouseX, mouseY, newScale, bounds, limitToBounds), x = _b.x, y = _b.y;
    return { scale: newScale, positionX: x, positionY: y };
}

var initialState = {
    previousScale: 1,
    scale: 1,
    positionX: 0,
    positionY: 0,
};
var contextInitialState = __assign(__assign({}, initialState), { setComponents: function () { return undefined; }, contextInstance: null });
var initialSetup = {
    disabled: false,
    minPositionX: null,
    maxPositionX: null,
    minPositionY: null,
    maxPositionY: null,
    minScale: 1,
    maxScale: 8,
    limitToBounds: true,
    centerZoomedOut: false,
    centerOnInit: false,
    wheel: {
        step: 0.2,
        disabled: false,
        wheelDisabled: false,
        touchPadDisabled: false,
        activationKeys: [],
        excluded: [],
    },
    panning: {
        disabled: false,
        velocityDisabled: false,
        lockAxisX: false,
        lockAxisY: false,
        activationKeys: [],
        excluded: [],
    },
    pinch: {
        step: 5,
        disabled: false,
        excluded: [],
    },
    doubleClick: {
        disabled: false,
        step: 0.7,
        mode: "zoomIn",
        animationType: "easeOut",
        animationTime: 200,
        excluded: [],
    },
    zoomAnimation: {
        disabled: false,
        size: 0.4,
        animationTime: 200,
        animationType: "easeOut",
    },
    alignmentAnimation: {
        disabled: false,
        sizeX: 100,
        sizeY: 100,
        animationTime: 200,
        velocityAlignmentTime: 400,
        animationType: "easeOut",
    },
    velocityAnimation: {
        disabled: false,
        sensitivity: 1,
        animationTime: 400,
        animationType: "easeOut",
        equalToMove: true,
    },
};

var createState = function (props) {
    var _a, _b, _c, _d;
    return {
        previousScale: (_a = props.initialScale) !== null && _a !== void 0 ? _a : initialState.scale,
        scale: (_b = props.initialScale) !== null && _b !== void 0 ? _b : initialState.scale,
        positionX: (_c = props.initialPositionX) !== null && _c !== void 0 ? _c : initialState.positionX,
        positionY: (_d = props.initialPositionY) !== null && _d !== void 0 ? _d : initialState.positionY,
    };
};
var createSetup = function (props) {
    var newSetup = __assign({}, initialSetup);
    Object.keys(props).forEach(function (key) {
        var validValue = typeof props[key] !== "undefined";
        var validParameter = typeof initialSetup[key] !== "undefined";
        if (validParameter && validValue) {
            var dataType = Object.prototype.toString.call(initialSetup[key]);
            var isObject = dataType === "[object Object]";
            var isArray = dataType === "[object Array]";
            if (isObject) {
                newSetup[key] = __assign(__assign({}, initialSetup[key]), props[key]);
            }
            else if (isArray) {
                newSetup[key] = __spreadArray(__spreadArray([], initialSetup[key]), props[key]);
            }
            else {
                newSetup[key] = props[key];
            }
        }
    });
    return newSetup;
};

var handleCalculateButtonZoom = function (contextInstance, delta, step) {
    var scale = contextInstance.transformState.scale;
    var wrapperComponent = contextInstance.wrapperComponent, setup = contextInstance.setup;
    var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation;
    var size = zoomAnimation.size;
    if (!wrapperComponent) {
        throw new Error("Wrapper is not mounted");
    }
    var targetScale = scale * Math.exp(delta * step);
    var newScale = checkZoomBounds(roundNumber(targetScale, 3), minScale, maxScale, size, false);
    return newScale;
};
var handleZoomToViewCenter = (contextInstance, arg_scale, animationTime, animationType)=> {
    var wrapperComponent = contextInstance.wrapperComponent;
    var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
    if (!wrapperComponent)
        return console.error("No WrapperComponent found");
    var wrapperWidth = wrapperComponent.offsetWidth;
    var wrapperHeight = wrapperComponent.offsetHeight;
    var mouseX = (wrapperWidth / 2 - positionX) / scale;
    var mouseY = (wrapperHeight / 2 - positionY) / scale;
    var newScale = arg_scale;
    var targetState = handleZoomToPoint(contextInstance, newScale, mouseX, mouseY);
    if (!targetState) {
        return console.error("Error during zoom event. New transformation state was not calculated.");
    }
    animate(contextInstance, targetState, animationTime, animationType);
}
function resetTransformations(contextInstance, animationTime, animationType) {
    var setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent;
    var limitToBounds = setup.limitToBounds;
    var initialTransformation = createState(contextInstance.props);
    var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
    if (!wrapperComponent)
        return;
    var newBounds = calculateBounds(contextInstance, initialTransformation.scale);
    var boundedPositions = getMouseBoundedPosition(initialTransformation.positionX, initialTransformation.positionY, newBounds, limitToBounds, 0, 0, wrapperComponent);
    var newState = {
        scale: initialTransformation.scale,
        positionX: boundedPositions.x,
        positionY: boundedPositions.y,
    };
    if (scale === initialTransformation.scale &&
        positionX === initialTransformation.positionX &&
        positionY === initialTransformation.positionY) {
        return;
    }
    animate(contextInstance, newState, animationTime, animationType);
}
function calculateZoomToNode(contextInstance, node, customZoom) {
    var wrapperComponent = contextInstance.wrapperComponent;
    var _a = contextInstance.setup, limitToBounds = _a.limitToBounds, minScale = _a.minScale, maxScale = _a.maxScale;
    if (!wrapperComponent)
        return initialState;
    var wrapperRect = wrapperComponent.getBoundingClientRect();
    var nodeRect = getOffset(node);
    var nodeLeft = nodeRect.x;
    var nodeTop = nodeRect.y;
    var nodeWidth = node.offsetWidth;
    var nodeHeight = node.offsetHeight;
    var scaleX = wrapperComponent.offsetWidth / nodeWidth;
    var scaleY = wrapperComponent.offsetHeight / nodeHeight;
    var newScale = checkZoomBounds(customZoom || Math.min(scaleX, scaleY), minScale, maxScale, 0, false);
    var offsetX = (wrapperRect.width - nodeWidth * newScale) / 2;
    var offsetY = (wrapperRect.height - nodeHeight * newScale) / 2;
    var newPositionX = (wrapperRect.left - nodeLeft) * newScale + offsetX;
    var newPositionY = (wrapperRect.top - nodeTop) * newScale + offsetY;
    var bounds = calculateBounds(contextInstance, newScale);
    var _b = getMouseBoundedPosition(newPositionX, newPositionY, bounds, limitToBounds, 0, 0, wrapperComponent), x = _b.x, y = _b.y;
    return { positionX: x, positionY: y, scale: newScale };
}
function getOffset(element) {
    var el = element;
    var offsetLeft = 0;
    var offsetTop = 0;
    while (el) {
        offsetLeft += el.offsetLeft;
        offsetTop += el.offsetTop;
        el = el.offsetParent;
    }
    return {
        x: offsetLeft,
        y: offsetTop,
    };
}
function isValidZoomNode(node) {
    if (!node) {
        console.error("Zoom node not found");
        return false;
    }
    else if ((node === null || node === void 0 ? void 0 : node.offsetWidth) === undefined ||
        (node === null || node === void 0 ? void 0 : node.offsetHeight) === undefined) {
        console.error("Zoom node is not valid - it must contain offsetWidth and offsetHeight");
        return false;
    }
    return true;
}

var zoomIn = function (contextInstance) { return function (step, animationTime, animationType) {
    if (step === void 0) { step = 0.5; }
    if (animationTime === void 0) { animationTime = 300; }
    if (animationType === void 0) { animationType = "easeOut"; }
    handleZoomToViewCenter(contextInstance, 1, step, animationTime, animationType);
}; };
var zoomOut = function (contextInstance) { return function (step, animationTime, animationType) {
    if (step === void 0) { step = 0.5; }
    if (animationTime === void 0) { animationTime = 300; }
    if (animationType === void 0) { animationType = "easeOut"; }
    handleZoomToViewCenter(contextInstance, -1, step, animationTime, animationType);
}; };
var setTransform = function (contextInstance) { return function (newPositionX, newPositionY, newScale, animationTime, animationType) {
    if (animationTime === void 0) { animationTime = 300; }
    if (animationType === void 0) { animationType = "easeOut"; }
    var _a = contextInstance.transformState, positionX = _a.positionX, positionY = _a.positionY, scale = _a.scale;
    var wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    var disabled = contextInstance.setup.disabled;
    if (disabled || !wrapperComponent || !contentComponent)
        return;
    var targetState = {
        positionX: isNaN(newPositionX) ? positionX : newPositionX,
        positionY: isNaN(newPositionY) ? positionY : newPositionY,
        scale: isNaN(newScale) ? scale : newScale,
    };
    animate(contextInstance, targetState, animationTime, animationType);
}; };
var resetTransform = function (contextInstance) { return function (animationTime, animationType) {
    if (animationTime === void 0) { animationTime = 200; }
    if (animationType === void 0) { animationType = "easeOut"; }
    resetTransformations(contextInstance, animationTime, animationType);
}; };
var centerView = function (contextInstance) { return function (scale, animationTime, animationType) {
    if (animationTime === void 0) { animationTime = 200; }
    if (animationType === void 0) { animationType = "easeOut"; }
    var transformState = contextInstance.transformState, wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    if (wrapperComponent && contentComponent) {
        var targetState = getCenterPosition(scale || transformState.scale, wrapperComponent, contentComponent);
        animate(contextInstance, targetState, animationTime, animationType);
    }
}; };
var zoomToElement = function (contextInstance) { return function (node, scale, animationTime, animationType) {
    if (animationTime === void 0) { animationTime = 600; }
    if (animationType === void 0) { animationType = "easeOut"; }
    handleCancelAnimation(contextInstance);
    var wrapperComponent = contextInstance.wrapperComponent;
    var target = typeof node === "string" ? document.getElementById(node) : node;
    if (wrapperComponent &&
        isValidZoomNode(target) &&
        target &&
        wrapperComponent.contains(target)) {
        var targetState = calculateZoomToNode(contextInstance, target, scale);
        animate(contextInstance, targetState, animationTime, animationType);
    }
}; };

var getContext = function (contextInstance) {
    return {
        instance: contextInstance,
        state: contextInstance.transformState,
        zoomIn: zoomIn(contextInstance),
        zoomOut: zoomOut(contextInstance),
        setTransform: setTransform(contextInstance),
        resetTransform: resetTransform(contextInstance),
        centerView: centerView(contextInstance),
        zoomToElement: zoomToElement(contextInstance),
    };
};

// We want to make event listeners non-passive, and to do so have to check
// that browsers support EventListenerOptions in the first place.
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
var passiveSupported = false;
function makePassiveEventOption() {
    try {
        var options = {
            get passive() {
                // This function will be called when the browser
                //   attempts to access the passive property.
                passiveSupported = true;
                return false;
            },
        };
        return options;
    }
    catch (err) {
        passiveSupported = false;
        return passiveSupported;
    }
}

var isExcludedNode = function (node, excluded) {
    var targetTagName = node.tagName.toUpperCase();
    var isExcludedTag = excluded.find(function (tag) { return tag.toUpperCase() === targetTagName; });
    if (isExcludedTag)
        return true;
    var isExcludedClassName = excluded.find(function (className) {
        return node.classList.contains(className);
    });
    if (isExcludedClassName)
        return true;
    return false;
};
var cancelTimeout = function (timeout) {
    if (timeout) {
        clearTimeout(timeout);
    }
};

var getTransformStyles = function (x, y, scale) {
    return "translate3d(" + x + "px, " + y + "px, 0) scale(" + scale + ")";
};
var getCenterPosition = function (scale, wrapperComponent, contentComponent) {
    var contentWidth = contentComponent.offsetWidth * scale;
    var contentHeight = contentComponent.offsetHeight * scale;
    var centerPositionX = (wrapperComponent.offsetWidth - contentWidth) / 2;
    var centerPositionY = (wrapperComponent.offsetHeight - contentHeight) / 2;
    return {
        scale: scale,
        positionX: centerPositionX,
        positionY: centerPositionY,
    };
};

var isWheelAllowed = function (contextInstance, event) {
    var _a = contextInstance.setup.wheel, disabled = _a.disabled, wheelDisabled = _a.wheelDisabled, touchPadDisabled = _a.touchPadDisabled, excluded = _a.excluded;
    var isInitialized = contextInstance.isInitialized, isPanning = contextInstance.isPanning;
    var target = event.target;
    var isAllowed = isInitialized && !isPanning && !disabled && target;
    if (!isAllowed)
        return false;
    // Event ctrlKey detects if touchpad action is executing wheel or pinch gesture
    if (wheelDisabled && !event.ctrlKey)
        return false;
    if (touchPadDisabled && event.ctrlKey)
        return false;
    var isExcluded = isExcludedNode(target, excluded);
    if (isExcluded)
        return false;
    return true;
};
function getDelta(event, customDelta) {
    var deltaY = event ? (event.deltaY < 0 ? 1 : -1) : 0;
    var delta = checkIsNumber(customDelta, deltaY);
    return delta;
}
function getMousePosition(event, contentComponent, scale) {
    var contentRect = contentComponent.getBoundingClientRect();
    var mouseX = 0;
    var mouseY = 0;
    if ("clientX" in event) {
        // mouse position x, y over wrapper component
        mouseX = (event.clientX - contentRect.left) / scale;
        mouseY = (event.clientY - contentRect.top) / scale;
    }
    else {
        var touch = event.touches[0];
        mouseX = (touch.clientX - contentRect.left) / scale;
        mouseY = (touch.clientY - contentRect.top) / scale;
    }
    if (isNaN(mouseX) || isNaN(mouseY))
        console.error("No mouse or touch offset found");
    return {
        x: mouseX,
        y: mouseY,
    };
}
var handleCalculateWheelZoom = function (contextInstance, delta, step, disablePadding, getTarget) {
    var scale = contextInstance.transformState.scale;
    var wrapperComponent = contextInstance.wrapperComponent, setup = contextInstance.setup;
    var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation;
    var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
    if (!wrapperComponent) {
        throw new Error("Wrapper is not mounted");
    }
    var targetScale = scale + delta * (scale - scale * step) * step;
    if (getTarget)
        return targetScale;
    var paddingEnabled = disablePadding ? false : !disabled;
    var newScale = checkZoomBounds(roundNumber(targetScale, 3), minScale, maxScale, size, paddingEnabled);
    return newScale;
};
var handleWheelZoomStop = function (contextInstance, event) {
    var previousWheelEvent = contextInstance.previousWheelEvent;
    var scale = contextInstance.transformState.scale;
    var _a = contextInstance.setup, maxScale = _a.maxScale, minScale = _a.minScale;
    if (!previousWheelEvent)
        return false;
    if (scale < maxScale || scale > minScale)
        return true;
    if (Math.sign(previousWheelEvent.deltaY) !== Math.sign(event.deltaY))
        return true;
    if (previousWheelEvent.deltaY > 0 && previousWheelEvent.deltaY < event.deltaY)
        return true;
    if (previousWheelEvent.deltaY < 0 && previousWheelEvent.deltaY > event.deltaY)
        return true;
    if (Math.sign(previousWheelEvent.deltaY) !== Math.sign(event.deltaY))
        return true;
    return false;
};

var isPinchStartAllowed = function (contextInstance, event) {
    var _a = contextInstance.setup.pinch, disabled = _a.disabled, excluded = _a.excluded;
    var isInitialized = contextInstance.isInitialized;
    var target = event.target;
    var isAllowed = isInitialized && !disabled && target;
    if (!isAllowed)
        return false;
    var isExcluded = isExcludedNode(target, excluded);
    if (isExcluded)
        return false;
    return true;
};
var isPinchAllowed = function (contextInstance) {
    var disabled = contextInstance.setup.pinch.disabled;
    var isInitialized = contextInstance.isInitialized, pinchStartDistance = contextInstance.pinchStartDistance;
    var isAllowed = isInitialized && !disabled && pinchStartDistance;
    if (!isAllowed)
        return false;
    return true;
};
var calculateTouchMidPoint = function (event, scale, contentComponent) {
    var contentRect = contentComponent.getBoundingClientRect();
    var touches = event.touches;
    var firstPointX = roundNumber(touches[0].clientX - contentRect.left, 5);
    var firstPointY = roundNumber(touches[0].clientY - contentRect.top, 5);
    var secondPointX = roundNumber(touches[1].clientX - contentRect.left, 5);
    var secondPointY = roundNumber(touches[1].clientY - contentRect.top, 5);
    return {
        x: (firstPointX + secondPointX) / 2 / scale,
        y: (firstPointY + secondPointY) / 2 / scale,
    };
};
var getTouchDistance = function (event) {
    return Math.sqrt(Math.pow(event.touches[0].pageX - event.touches[1].pageX, 2) +
        Math.pow(event.touches[0].pageY - event.touches[1].pageY, 2));
};
var calculatePinchZoom = function (contextInstance, currentDistance) {
    var pinchStartScale = contextInstance.pinchStartScale, pinchStartDistance = contextInstance.pinchStartDistance, setup = contextInstance.setup;
    var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation;
    var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
    if (!pinchStartScale || pinchStartDistance === null || !currentDistance) {
        throw new Error("Pinch touches distance was not provided");
    }
    if (currentDistance < 0) {
        return contextInstance.transformState.scale;
    }
    var touchProportion = currentDistance / pinchStartDistance;
    var scaleDifference = touchProportion * pinchStartScale;
    return checkZoomBounds(roundNumber(scaleDifference, 2), minScale, maxScale, size, !disabled);
};

var wheelStopEventTime = 160;
var wheelAnimationTime = 100;
var handleWheelStart = function (contextInstance, event) {
    var _a = contextInstance.props, onWheelStart = _a.onWheelStart, onZoomStart = _a.onZoomStart;
    if (!contextInstance.wheelStopEventTimer) {
        handleCancelAnimation(contextInstance);
        handleCallback(getContext(contextInstance), event, onWheelStart);
        handleCallback(getContext(contextInstance), event, onZoomStart);
    }
};
var handleWheelZoom = function (contextInstance, event) {
    var _a = contextInstance.props, onWheel = _a.onWheel, onZoom = _a.onZoom;
    var contentComponent = contextInstance.contentComponent, setup = contextInstance.setup, transformState = contextInstance.transformState;
    var scale = transformState.scale;
    var limitToBounds = setup.limitToBounds, centerZoomedOut = setup.centerZoomedOut, zoomAnimation = setup.zoomAnimation, wheel = setup.wheel;
    var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
    var step = wheel.step;
    if (!contentComponent) {
        throw new Error("Component not mounted");
    }
    event.preventDefault();
    event.stopPropagation();
    var delta = getDelta(event, null);
    var newScale = handleCalculateWheelZoom(contextInstance, delta, step, !event.ctrlKey);
    // if scale not change
    if (scale === newScale)
        return;
    var bounds = handleCalculateBounds(contextInstance, newScale);
    var mousePosition = getMousePosition(event, contentComponent, scale);
    var isPaddingDisabled = disabled || size === 0 || centerZoomedOut;
    var isLimitedToBounds = limitToBounds && isPaddingDisabled;
    var _b = handleCalculateZoomPositions(contextInstance, mousePosition.x, mousePosition.y, newScale, bounds, isLimitedToBounds), x = _b.x, y = _b.y;
    contextInstance.previousWheelEvent = event;
    contextInstance.setTransformState(newScale, x, y);
    handleCallback(getContext(contextInstance), event, onWheel);
    handleCallback(getContext(contextInstance), event, onZoom);
};
var handleWheelStop = function (contextInstance, event) {
    var _a = contextInstance.props, onWheelStop = _a.onWheelStop, onZoomStop = _a.onZoomStop;
    // fire animation
    cancelTimeout(contextInstance.wheelAnimationTimer);
    contextInstance.wheelAnimationTimer = setTimeout(function () {
        if (!contextInstance.mounted)
            return;
        handleAlignToScaleBounds(contextInstance, event.x, event.y);
        contextInstance.wheelAnimationTimer = null;
    }, wheelAnimationTime);
    // Wheel stop event
    var hasStoppedZooming = handleWheelZoomStop(contextInstance, event);
    if (hasStoppedZooming) {
        cancelTimeout(contextInstance.wheelStopEventTimer);
        contextInstance.wheelStopEventTimer = setTimeout(function () {
            if (!contextInstance.mounted)
                return;
            contextInstance.wheelStopEventTimer = null;
            handleCallback(getContext(contextInstance), event, onWheelStop);
            handleCallback(getContext(contextInstance), event, onZoomStop);
        }, wheelStopEventTime);
    }
};

var handlePinchStart = function (contextInstance, event) {
    var distance = getTouchDistance(event);
    contextInstance.pinchStartDistance = distance;
    contextInstance.lastDistance = distance;
    contextInstance.pinchStartScale = contextInstance.transformState.scale;
    contextInstance.isPanning = false;
    handleCancelAnimation(contextInstance);
};
var handlePinchZoom = function (contextInstance, event) {
    var contentComponent = contextInstance.contentComponent, pinchStartDistance = contextInstance.pinchStartDistance;
    var scale = contextInstance.transformState.scale;
    var _a = contextInstance.setup, limitToBounds = _a.limitToBounds, centerZoomedOut = _a.centerZoomedOut, zoomAnimation = _a.zoomAnimation;
    var disabled = zoomAnimation.disabled, size = zoomAnimation.size;
    // if one finger starts from outside of wrapper
    if (pinchStartDistance === null || !contentComponent)
        return;
    var midPoint = calculateTouchMidPoint(event, scale, contentComponent);
    // if touches goes off of the wrapper element
    if (!isFinite(midPoint.x) || !isFinite(midPoint.y))
        return;
    var currentDistance = getTouchDistance(event);
    var newScale = calculatePinchZoom(contextInstance, currentDistance);
    if (newScale === scale)
        return;
    var bounds = handleCalculateBounds(contextInstance, newScale);
    var isPaddingDisabled = disabled || size === 0 || centerZoomedOut;
    var isLimitedToBounds = limitToBounds && isPaddingDisabled;
    var _b = handleCalculateZoomPositions(contextInstance, midPoint.x, midPoint.y, newScale, bounds, isLimitedToBounds), x = _b.x, y = _b.y;
    contextInstance.pinchMidpoint = midPoint;
    contextInstance.lastDistance = currentDistance;
    contextInstance.setTransformState(newScale, x, y);
};
var handlePinchStop = function (contextInstance) {
    var pinchMidpoint = contextInstance.pinchMidpoint;
    contextInstance.velocity = null;
    contextInstance.lastDistance = null;
    contextInstance.pinchMidpoint = null;
    contextInstance.pinchStartScale = null;
    contextInstance.pinchStartDistance = null;
    handleAlignToScaleBounds(contextInstance, pinchMidpoint === null || pinchMidpoint === void 0 ? void 0 : pinchMidpoint.x, pinchMidpoint === null || pinchMidpoint === void 0 ? void 0 : pinchMidpoint.y);
};

function handleDoubleClick(contextInstance, event) {
    var _a = contextInstance.setup.doubleClick, disabled = _a.disabled, mode = _a.mode, step = _a.step, animationTime = _a.animationTime, animationType = _a.animationType;
    if (disabled)
        return;
    if (mode === "reset") {
        return resetTransformations(contextInstance, animationTime, animationType);
    }
    var scale = contextInstance.transformState.scale;
    var contentComponent = contextInstance.contentComponent;
    if (!contentComponent)
        return console.error("No ContentComponent found");
    var delta = mode === "zoomOut" ? -1 : 1;
    var newScale = handleCalculateButtonZoom(contextInstance, delta, step);
    var mousePosition = getMousePosition(event, contentComponent, scale);
    var targetState = handleZoomToPoint(contextInstance, newScale, mousePosition.x, mousePosition.y);
    if (!targetState) {
        return console.error("Error during zoom event. New transformation state was not calculated.");
    }
    animate(contextInstance, targetState, animationTime, animationType);
}
var isDoubleClickAllowed = function (contextInstance, event) {
    var isInitialized = contextInstance.isInitialized, setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent;
    var _a = setup.doubleClick, disabled = _a.disabled, excluded = _a.excluded;
    var target = event.target;
    var isWrapperChild = wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.contains(target);
    var isAllowed = isInitialized && target && isWrapperChild && !disabled;
    if (!isAllowed)
        return false;
    var isExcluded = isExcludedNode(target, excluded);
    if (isExcluded)
        return false;
    if (!isAllowed)
        return false;
    return true;
};

exports.handleZoomToViewCenter = handleZoomToViewCenter;
