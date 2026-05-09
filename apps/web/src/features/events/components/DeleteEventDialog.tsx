import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

type DeleteEventDialogProps = {
    open: boolean;
    eventTitle: string;
    isDeleting: boolean;
    error: string | null;
    onClose: () => void;
    onConfirm: () => void;
};

export function DeleteEventDialog({
                                      open,
                                      eventTitle,
                                      isDeleting,
                                      error,
                                      onClose,
                                      onConfirm,
                                  }: DeleteEventDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={isDeleting ? undefined : onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Delete event</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete "{eventTitle}"? This action cannot be
                    undone.
                </DialogContentText>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={isDeleting}>
                    Cancel
                </Button>

                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}