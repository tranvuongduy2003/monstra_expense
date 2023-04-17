import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BudgetScreen from 'screens/Budget/BudgetScreen';
import HomeScreen from 'screens/Home/HomeScreen';
import TransactionScreen from 'screens/Transaction/TransactionScreen';
import ProfileScreen from 'screens/Profile/ProfileScreen';
import React from 'react';
import {
  ArrowsRightLeftIcon,
  ChartPieIcon,
  HomeIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import {AppColors} from 'constants/AppColors';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import * as shape from 'd3-shape';
import {Path, Svg} from 'react-native-svg';
import AddButton from 'components/AddButton';

interface ITabsProps {}

const Tab = createBottomTabNavigator();

const {width} = Dimensions.get('window');

const tabWidth = width / 4;
const height = 70;

const left = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(shape.curveBasis)([
  {x: 0, y: -1},
  {x: width, y: -1},
]);

const tab = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(shape.curveBasis)([
  {x: width, y: 0},
  {x: width + 5, y: 0},
  {x: width + 10, y: 5},
  {x: width + 15, y: 40},
  {x: width + tabWidth / 2, y: 55},
  {x: width + tabWidth - 15, y: 40},
  {x: width + tabWidth - 10, y: 5},
  {x: width + tabWidth - 5, y: 0},
  {x: width + tabWidth, y: 0},
]);

const right = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)([
  {x: width + tabWidth, y: 0},
  {x: width * 2, y: 0},
  {x: width * 2, y: height},
  {x: 0, y: height},
  {x: 0, y: 0},
]);
const d = `${left} ${tab} ${right}`;

const Tabs: React.FunctionComponent<ITabsProps> = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          zIndex: 1000,
          elevation: 0,
          height: 70,
          borderTopWidth: 0,
          position: 'absolute',
        },
        tabBarBackground: () => (
          <>
            <Svg
              width={width * 2}
              {...{height}}
              style={{
                transform: [{translateX: -(width / 2) - tabWidth / 2}],
              }}>
              <Path {...{d}} fill="white" />
            </Svg>
          </>
        ),
        tabBarActiveTintColor: AppColors.primaryColor,
        tabBarShowLabel: false,
      }}>
      <Tab.Group>
        <Tab.Screen
          name="Home2"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <View style={styles.tab}>
                <HomeIcon color={color} size={size} />
                <Text style={[styles.text, {color: color}]}>Home</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <View style={styles.tab}>
                <ArrowsRightLeftIcon color={color} size={size} />
                <Text style={[styles.text, {color: color}]}>Transaction</Text>
              </View>
            ),
          }}
        />
      </Tab.Group>
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarButton: () => <AddButton />,
        }}
      />
      <Tab.Group>
        <Tab.Screen
          name="Budget"
          component={BudgetScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <View style={styles.tab}>
                <ChartPieIcon color={color} size={size} />
                <Text style={[styles.text, {color: color}]}>Budget</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <View style={styles.tab}>
                <UserIcon color={color} size={size} />
                <Text style={[styles.text, {color: color}]}>Profile</Text>
              </View>
            ),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
  },
});

export default Tabs;
