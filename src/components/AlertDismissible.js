
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export const AlertDismissible = () => {

    const dispatch = useDispatch();
    const alerts = useSelector(state => state.alerts);

    const handleClose = (id) => {
        dispatch({ type: 'closeAlert', payload: id });
    }

    return (
        <>
            {alerts.map(alertOpt => {
                const handleCloseFn = () => handleClose(alertOpt.id);
                let contentClass = '';
                switch (alertOpt.type) {
                    case 'error':
                        contentClass = 'text-danger';
                        break;
                    case 'success':
                        contentClass = 'text-success';
                        break;
                    case 'info':
                        contentClass = 'text-info';
                        break;


                }
                return (<Modal key={alertOpt.id} show={true} onHide={handleCloseFn} contentClassName={contentClass}>
                    <Modal.Header closeButton>
                        <Modal.Title>{alertOpt.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{alertOpt.body}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseFn}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>)
            })}
        </>);
}