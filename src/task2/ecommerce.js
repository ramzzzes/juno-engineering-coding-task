////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////


//helpers section
const secondsToDays = (seconds) => {
    return seconds / (24 * 60 * 60 * 100);
}

const fetchAllOrders = () => {
    const ids = allIds;

    let orders = ids.map(id => fetchOrderById(id))

    return Promise.all(orders)
};

const bucketOrdersByUsers = async () => {
    const orders = await fetchAllOrders()
    const grouped = {}

    orders.map(order => {
        grouped[order.userId] = grouped[order.userId] ? [...grouped[order.userId], order.title] : [order.title];
    })

    return grouped
};

const getLast2WeeksOrders = async () => {
    const orders = await fetchAllOrders()

    return orders.filter(order => secondsToDays(Date.now() - order.timestamp) <= 14)
};

const bucketOrdersByDate = async () => {
    const orders = await fetchAllOrders()
    const grouped = {}

    orders.map(order => {
        let date = new Date(order.timestamp).toLocaleDateString()
        grouped[date] = grouped[date] ? [...grouped[date], order.title] : [order.title];
    })

    return grouped
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
