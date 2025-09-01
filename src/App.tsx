import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { resources } from "./config/resources";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider } from "./providers/data";
import { liveProvider } from "./providers/data";
import { authProvider } from './providers/index';
import { Home, ForgotPassword, Login, Register } from './pages';


import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { App as AntdApp } from "antd";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Layout from "./components/layout";

import CompanyList from "./pages/company/list";
import Create from "./pages/company/create";
import Edit from "./pages/company/edit"
import TaskList from "./pages/tasks/TaskList";
import CreateTask from "./pages/tasks/createTask";
import EditTask from "./pages/tasks/editTask";


function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "B6cjiX-r30GWY-MuyxGY",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route element={
                  <Authenticated key='authenticated-layout'
                    fallback={<CatchAllNavigate to={'/login'} />}>
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>}>
                  <Route index element={<Home />} />
                  <Route path='/companies'>
                    <Route index element={<CompanyList />} />
                    <Route path="new" element={<Create />} />
                    <Route path="edit/:id" element={<Edit />} />
                  </Route>
                  <Route path="/tasks" element={
                    <TaskList>
                      <Outlet />
                    </TaskList>
                  }>
                    <Route path="new" element={<CreateTask />} />
                    <Route path="edit/:id" element={<EditTask />} />
                  </Route>
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter >
  );
}

export default App;
