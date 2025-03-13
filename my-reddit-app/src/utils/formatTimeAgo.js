import { formatDistanceToNow } from 'date-fns';

export const formatTimeAgo = (timestamp) => {
    if (timestamp === undefined) {
        return 'Invalid time'; // Return a default message for undefined timestamps
    }
    const date = new Date(timestamp * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
};