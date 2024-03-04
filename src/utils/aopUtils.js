import {scrollToOriginal} from "@/utils/affixUtils";

export function inputDebounce(func) {
    let timerId;
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, 1000);
    };
}

export function withScrollToOriginal(fn){
    return () => {
        scrollToOriginal();
        fn();
    }
}

export function scrollingDebounce(fn) {
    let isScrolling = false;
    let timeout;

    return () => {
        if (!isScrolling) {
            isScrolling = true;
            fn.apply(this, arguments);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                isScrolling = false;
            }, 200); // 设置延迟时间，这里是200毫秒
        }
    }
}

export function withLoading(loading, fn){
    return async function () {
        loading.value = true;
        try {
            await fn.apply(this, arguments);
        } finally {
            loading.value = false;
        }
    };
}