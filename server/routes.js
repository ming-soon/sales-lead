import express from 'express'

import { isAuthenticated, isAdmin } from './middleware/passport'

import AuthController from './controllers/auth'
import UserController from './controllers/user'
import SheetController from './controllers/sheet'
import LeadController from './controllers/lead'

const router = new express.Router()

router.post('/login', AuthController.postLogin)
router.get('/logout', AuthController.getLogout)
router.post('/profile/password', isAuthenticated, AuthController.postChangePassword)

router.get('/users', isAuthenticated, isAdmin, UserController.getUsers)
router.post('/users', isAuthenticated, isAdmin, UserController.postUser)
router.get('/users/:id', isAuthenticated, isAdmin, UserController.getUser)
router.put('/users/:id', isAuthenticated, isAdmin, UserController.putUser)
router.delete('/users/:id', isAuthenticated, isAdmin, UserController.deleteUser)

router.get('/sheets', isAuthenticated, SheetController.getSheets)
router.post('/sheets', isAuthenticated, SheetController.postSheet)
router.get('/sheets/:id', isAuthenticated, SheetController.getSheet)
router.put('/sheets/:id', isAuthenticated, SheetController.putSheet)
router.delete('/sheets/:id', isAuthenticated, SheetController.deleteSheet)

router.get('/leads', isAuthenticated, LeadController.getLeads)
router.post('/leads/bulk', isAuthenticated, LeadController.postLeadBulk)

export default router
