// import ReactGA from 'react-ga';

// export const LoginEvent = 'login';
// export const RegisterEvent = 'register';
// export const RechargeEvent = 'recharge';
// export const PartitionOpenEvent = 'partitionOpen';
// export const PartitionCreateEvent = 'partitionCreate';
// export const ShareEvent = 'share';
// export const UploadEvent = 'upload';

// const eventsCategory = {
//   [LoginEvent]: 'User',
//   [RegisterEvent]: 'User',
//   [RechargeEvent]: 'Purchase',
//   [PartitionOpenEvent]: 'Partition',
//   [PartitionCreateEvent]: 'Partition',
//   [ShareEvent]: 'File',
//   [UploadEvent]: 'File',
// };

// export function sendEvent(eventName, eventValue, eventParameters = {}) {
//   ReactGA.event({
//     category: eventsCategory[eventName],
//     action: eventName,
//     value: eventValue,
//     ...eventParameters,
//   });
// }

// export function sendPageView(pageAddress) {
//   ReactGA.pageview(pageAddress);
// }

// export function sendTransaction(id, revenue) {
//   ReactGA.plugin.require('ecommerce');
//   ReactGA.plugin.execute('ecommerce', 'addTransaction', {
//     id,
//     revenue,
//   });
//   ReactGA.plugin.execute('ecommerce', 'send');
// }
