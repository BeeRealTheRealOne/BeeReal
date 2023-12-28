import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Colors from '../constants/colors';

export default function CameraIcon() {
    return (
        <Link href="/snap/">
            <Ionicons name="camera" size={25} color={Colors.baseText} />
        </Link>
    );
}
