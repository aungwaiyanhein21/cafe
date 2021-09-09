const ModalService = {
    on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail));
    },
    open(component, props={}) {
        document.dispatchEvent(new CustomEvent('open', { detail: { component, props}}));
        document.querySelector('body').classList.toggle('no-scroll');
    }
};

export default ModalService;