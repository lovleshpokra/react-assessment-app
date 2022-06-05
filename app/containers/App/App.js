import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, useLocation } from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import Profile from 'containers/Profile/Loadable';
import Menu from 'containers/Menu/Loadable';
import Tour from 'containers/Tour/Loadable';
import Auth from 'containers/Auth/Loadable';
import AppDashboard from 'containers/AppDashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ExamList from 'containers/ExamList/Loadable';
import ExamDetails from 'containers/ExamDetails/Loadable';
import PackagesDetails from 'containers/PackagesDetails/Loadable';
import ExamWindow from 'containers/ExamWindow/Loadable';
import ResultDashboard from 'containers/ResultDashboard/Loadable';
import Packages from 'containers/Packages/Loadable';
import Courses from 'containers/Courses/Loadable';
import Publication from 'containers/Publication/Loadable';
import News from 'containers/News/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';

const App = () => {
  const { pathname } = useLocation();
  const showHeaderFooter = pathname !== '/tour' && pathname !== '/' && pathname !== '/auth' && pathname.indexOf('/exam/');
  const hideHeader = pathname === '/menu' || pathname === '/profile';
  return (
    <div className="app-wrapper">
      <LoadingIndicator />
      <Helmet
        titleTemplate="%s - ZONE TECH"
        defaultTitle="ZONE TECH"
      >
        <meta name="description" content="ZONE TECH" />
      </Helmet>
      <div className="app-content">
        {(showHeaderFooter && !hideHeader) ? <Header /> : <Fragment />}
        <Switch>
          <Route exact path="/" component={Tour} />
          <Route path="/auth" component={Auth} />
          <Route path="/appdashboard" component={AppDashboard} />
          <Route path="/examlist" component={ExamList} />
          <Route path="/profile" component={Profile} />
          <Route path="/menu" component={Menu} />
          <Route path="/examdetails/:packageId" component={ExamDetails} />
          <Route path="/demo-exam/:courseId" component={ExamDetails} />
          <Route path="/exam/:studentId/:packageId/:examId" component={ExamWindow} />
          <Route path="/results/:studentExamId" component={ResultDashboard} />
          <Route path="/packagedetails/:packageId" component={PackagesDetails} />
          <Route path="/publication" component={Publication} />
          <Route path="/courses" component={Courses} />
          <Route path="/booklist/:catId" component={Publication} />
          <Route path="/packages" component={Packages} />
          <Route path="/news" component={News} />
          <Route path="/tour" component={Tour} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
      {showHeaderFooter ? <Footer /> : <Fragment />}
    </div>
  );
};

export default App;
