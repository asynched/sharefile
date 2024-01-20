import { Profile } from 'src/domain/entities'
import { createStore } from 'src/hooks/useStore'

export const auth = createStore<Profile | null>(null)
