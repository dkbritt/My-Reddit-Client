import { formatDistanceToNow } from 'date-fns';

export const formatTimeAgo = (timestamp) => {
    // console.log('Timestamp:', timestamp); // Log the timestamp value
    if (timestamp === undefined) {
        return 'Invalid time'; // Return a default message for undefined timestamps
    }
    const date = new Date(timestamp * 1000);
    // console.log('Date:', date); // Log the Date object
    return formatDistanceToNow(date, { addSuffix: true });
};