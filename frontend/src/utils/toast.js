import {toast} from 'react-toastify'

export const showSuccess = (msg) =>
{
    toast.success(msg);
}

export const showErr = (msg) =>
{
    toast.error(msg);
}