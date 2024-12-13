import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../components/elements/modal/alert/alert';
test('renders alert and closes on button click', () => {
    const handleClose = jest.fn();
    render(<Alert isOpen={true} onClose={handleClose} message="Test Alert" />);

    expect(screen.getByText('Test Alert')).toBeInTheDocument();

    fireEvent.click(screen.getByText('OK'));

    expect(handleClose).toHaveBeenCalledTimes(1);
});
