import { Provider } from 'react-redux';
import { useStore } from '../lib/redux/store'; // Adjust this import path if necessary
import { createWrapper } from 'next-redux-wrapper';
import RootLayout from './layout';
// import '../app/styles/globals.css';
// import 'antd/dist/antd.css';

// import TopBar from '../components/TopBar/TopBar';
// import SidebarMenu from '../components/Sidebar/Sidebar';
// import NotificationBar from '../components/NotificationBar/NotificationBar';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Provider>
  );
}

const makeStore = () => useStore();
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
