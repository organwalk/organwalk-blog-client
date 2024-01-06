export function scrollToOriginal(){
    window.scrollTo({
        top: window.pageYOffset,
        behavior: 'smooth'
    });
}

export function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}