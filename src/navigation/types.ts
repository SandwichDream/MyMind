import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Main: undefined;
    Home: undefined;
    Details: undefined;
    Game: { choosedLevel: number };
};

export type NavigationProps<T extends keyof RootStackParamList> = {
    navigation: NativeStackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
};
