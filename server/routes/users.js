import express from 'express'
import { addRemoveLikedSkins, getUser, getUserLikedSkins, getUserOwnedSkins } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// READ
router.get('/:id', verifyToken, getUser)
router.get('/:id/likedSkins', verifyToken, getUserLikedSkins)
router.get('/:id/ownedSkins', verifyToken, getUserOwnedSkins)

// UPDATE
router.patch('/:id/:skinId/addRemoveLikedSkins', verifyToken, addRemoveLikedSkins)

export default router
