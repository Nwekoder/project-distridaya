import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AppLayout from './components/AppLayout'
import PurchaseOrderPage from './pages/PurchaseOrderPage'
import SupplierPage from './pages/SupplierPage'
import CustomerPage from './pages/CustomerPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        path: '/app/dashboard',
        element: <div>DashboardPage</div>
      },
      {
        path: '/app/users',
        element: <div>UsersPage</div>
      },
      {
        path: '/app/supplier',
        element: <SupplierPage />
      },
      {
        path: '/app/customer',
        element: <CustomerPage />
      },
      {
        path: '/app/purchase_order',
        element: <PurchaseOrderPage />
      },
      {
        path: '/app/good_receipt',
        element: <div>GoodReceiptPage</div>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
