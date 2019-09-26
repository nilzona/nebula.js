import SvgIcon from './SvgIcon';

const selectAll = props => ({
  ...props,
  d:
    'M15.4,9 C15.8,9 16,9.3 16,9.6 L16,15.4 C16,15.7 15.8,16 15.4,16 L9.6,16 C9.3,16 9,15.8 9,15.4 L9,9.6 C9,9.3 9.3,9 9.6,9 L15.4,9 Z M15,10 L10,10 L10,15 L15,15 L15,10 Z M6.5,0 C6.8,0 7,0.3 7,0.6 L7,6.4 C7,6.8 6.8,7 6.5,7 L0.6,7 C0.3,7 0,6.8 0,6.5 L0,0.6 C0,0.3 0.3,0 0.6,0 L6.5,0 Z M6,2.8 C6.3,2.5 6.3,2.1 6.1,1.8 C5.9,1.5 5.4,1.6 5.1,1.9 L3.1,3.9 L2.4,3.2 C2.1,2.9 1.7,2.9 1.4,3.1 C1.2,3.3 1.2,3.8 1.5,4.1 L2.7,5.3 C3,5.6 3.4,5.6 3.7,5.3 L3.8,5.3 L6,2.8 Z M6.5,9 C6.8,9 7,9.3 7,9.6 L7,15.4 C7,15.8 6.8,16 6.5,16 L0.6,16 C0.3,16 0,15.8 0,15.4 L0,9.6 C0,9.3 0.3,9 0.6,9 L6.5,9 Z M6,11.8 C6.3,11.5 6.3,11.1 6.1,10.8 C5.9,10.6 5.4,10.6 5.1,10.8 L3.1,12.8 L2.3,12 C2,11.7 1.6,11.7 1.3,12 C1.1,12.3 1.1,12.7 1.4,13 L2.6,14.2 C2.9,14.5 3.3,14.5 3.6,14.3 L3.7,14.2 L6,11.8 Z M15.4,0 C15.8,0 16,0.3 16,0.6 L16,6.4 C16,6.8 15.8,7 15.4,7 L9.6,7 C9.3,7 9,6.8 9,6.5 L9,0.6 C9,0.3 9.3,0 9.6,0 L15.4,0 Z M15,2.8 C15.3,2.5 15.3,2.1 15.1,1.8 C14.9,1.5 14.4,1.6 14.1,1.9 L12.1,3.9 L11.3,3.1 C11,2.8 10.6,2.8 10.3,3 C10,3.2 10.1,3.7 10.3,4 L11.5,5.2 C11.8,5.5 12.2,5.5 12.5,5.2 L15,2.8 Z',
});

export default props => SvgIcon(selectAll(props));
export { selectAll };