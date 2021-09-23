export class AlertService {
    setup(dispatch) {
        this.dispatch = dispatch;
    }

    // {
    //     type: 'error' | 'success' | 'info',
    //     title: string,
    //     body: string
    // };
    showAlert(options) {
        this.dispatch({ type: 'showAlert', payload: options });
    }

    showError(msg) {
        this.showAlert({
            type: 'error',
            title: 'Error',
            body: msg
        })
    }

    showSuccess(msg) {
        this.showAlert({
            type: 'success',
            title: 'Successful',
            body: msg
        })
    }
}

const alertService = new AlertService();

export default alertService;