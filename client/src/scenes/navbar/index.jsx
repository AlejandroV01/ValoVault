import { ArrowForward, Close, Menu, Person } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { PrimaryButton, SecondaryButtonNoLink } from 'components/Buttons'
import FlexBetween from 'components/FlexBetween'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setLogout } from 'state'
const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  const theme = useTheme()
  const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const isAuth = Boolean(useSelector(state => state.token))

  // const fullName = `${user.firstName} ${user.lastName}`
  return (
    <FlexBetween padding={'1rem 6%'} backgroundColor={'#0000005c'} sx={{ backdropFilter: 'blur(7px)' }} top={0} position={'sticky'} zIndex={10}>
      <Stack>
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color={theme.palette.neutral.dark}
          onClick={() => navigate('/')}
          fontFamily={"'Righteous', cursive"}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          ValoVault
        </Typography>
      </Stack>
      {/* DESKTOP NAV */}
      {isNonMobileScreens && (
        <FlexBetween gap={'1rem'} variant='p'>
          <a href='/market' onClick={e => e.preventDefault()} style={{ textDecoration: 'none', color: 'unset' }}>
            <Typography variant='h5' sx={{ cursor: 'pointer' }} onClick={() => navigate('/market')}>
              MARKET
            </Typography>
          </a>
          {/* <a href='/market' onClick={e => e.preventDefault()} style={{ textDecoration: 'none', color: 'unset' }}>
            <Typography variant='h5' sx={{ cursor: 'pointer' }} onClick={() => navigate('/market')}>
              SOCIAL
            </Typography>
          </a> */}
        </FlexBetween>
      )}
      {isNonMobileScreens && !isAuth && (
        <PrimaryButton to='login'>
          LOG IN HERE
          <ArrowForward fontSize='medium' />
        </PrimaryButton>
      )}
      {isNonMobileScreens && isAuth && (
        <FlexBetween gap={'1rem'}>
          <PrimaryButton to={`profile/${user.username}`}>
            <Person />
            <Typography variant='p'>Profile</Typography>
          </PrimaryButton>
          <SecondaryButtonNoLink
            onClick={() => {
              dispatch(setLogout())
              toast.success('Successfully Logged Out!', {
                theme: 'dark',
                position: 'bottom-right',
              })
            }}
          >
            Log Out
          </SecondaryButtonNoLink>
        </FlexBetween>
      )}
      {!isNonMobileScreens && (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu sx={{ fontSize: '25px' }} />
        </IconButton>
      )}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box position='absolute' right='0' top='0' height='100vh' zIndex='11' maxWidth='500px' minWidth='300px' backgroundColor={background}>
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>
          <FlexBetween gap='3rem' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            {/* <a href='/market' onClick={e => e.preventDefault()} style={{ textDecoration: 'none', color: 'unset' }}>
              <Typography variant='h5' sx={{ cursor: 'pointer' }} onClick={() => navigate('/market')}>
                MARKET
              </Typography>
            </a> */}
            <div></div>
            {isAuth && (
              <PrimaryButton to={`profile/${user.username}`}>
                <Person />
                <Typography variant='p'>Profile</Typography>
              </PrimaryButton>
            )}
            {!isAuth && (
              <PrimaryButton to='login'>
                LOG IN HERE
                <ArrowForward fontSize='medium' />
              </PrimaryButton>
            )}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar
