const routes = [
  { path: '/', name: 'home', component: () => import('@/components/pages/MainPage') },
  { path: '/authorization', name: 'authorization', component: () => import('@/components/pages/AuthorizationPage') },
  { path: '/make-design', name: 'makeDesign', component: () => import('@/components/pages/MakeDesign') },
  { path: '/choose-type', name: 'chooseType', component: () => import('@/components/pages/ChooseType') },
  { path: '/choose-size', name: 'chooseSize', component: () => import('@/components/pages/ChooseSize') },
  { path: '/save-project', name: 'saveProject', component: () => import('@/components/pages/SaveProject') },
  { path: '/archief-page', name: 'archiefPage', component: () => import('@/components/pages/ArchiefPage') },
  { path: '/project-overview/:projectId', name: 'projectOverviewPage', component: () => import('@/components/pages/ProjectOverviewPage') },
];

export default routes;
