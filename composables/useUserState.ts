import { createGlobalState } from '@vueuse/core'
import { Kayttaja } from 'types'

export const useUserState = createGlobalState(
  () => {

    const userData = useState<Kayttaja>()

    const setUserData = (user: Kayttaja): void => {
    userData.value = user
  }

    return { userData, setUserData }
  }
)