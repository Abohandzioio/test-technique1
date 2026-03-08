import { render, fireEvent } from '@testing-library/react';
import EmojiRating from './EmojiRating';

describe('EmojiRating', () => {
    const mockOnChange = jest.fn();

    it('renders all 5 ratings', () => {
        const { getAllByRole } = render(<EmojiRating value={0} onChange={mockOnChange} />);
        expect(getAllByRole('button')).toHaveLength(5);
    });

    it('calls onChange when a rating is clicked', () => {
        const { getAllByRole } = render(<EmojiRating value={0} onChange={mockOnChange} />);
        const buttons = getAllByRole('button');
        fireEvent.click(buttons[2]); // Click the 3rd emoji
        expect(mockOnChange).toHaveBeenCalledWith(3);
    });

    it('highlights the selected value', () => {
        const { getAllByRole } = render(<EmojiRating value={4} onChange={mockOnChange} />);
        const buttons = getAllByRole('button');
        // The 4th button (index 3) should have active classes
        expect(buttons[3]).toHaveClass('scale-105');
    });

    it('disables buttons when disabled prop is true', () => {
        const { getAllByRole } = render(<EmojiRating value={0} onChange={mockOnChange} disabled={true} />);
        const buttons = getAllByRole('button');
        buttons.forEach(button => expect(button).toBeDisabled());
    });
});
