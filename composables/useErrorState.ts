import { ErrorType } from "types"

export const useErrorState = createGlobalState(
    () => {
        const errorData = useState<ErrorType | null>()

        const setErrorData = (error: ErrorType): void => {
            if(!errorData.value){
                errorData.value = error;
            }
        }

        return {errorData, setErrorData}
    }
)