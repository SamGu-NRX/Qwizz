import Settings from '@/components/Dashboard/Settings'
import ProtectedRoute from '@/components/PrivateRoute'

export default function App(){
    return (
        <ProtectedRoute>
            <Settings />
        </ProtectedRoute>
    )
}