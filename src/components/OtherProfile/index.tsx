import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_LISTINGS, GET_CURRENT_USER } from '@constants/queries';
import UserInfoButton from '@components/common/UserInfoButton';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import theme from '@theme';
import Button from '@components/common/Button';
import LoadingIndicator from '@components/common/LoadingIndicator';
import Error from '@components/common/Error';
import ItemCard from '@components/common/ItemCard';
import { ListingProp } from '@constants/types';
import Box from '@components/common/Box';

const userDetails = [
  {
    iconName: 'check-circle-outline',
    text: 'Email, Google, Facebook',
  },
  {
    iconName: 'crosshairs-gps',
    text: 'Paris, France',
  },
  {
    iconName: 'rss',
    text: '12 followers, 45 following',
  },
];

const OtherProfile = () => {
  const route = useRoute();
  const n = useNavigation();

  const {
    params: { id, username, ownerId, userPicture },
  } = route;

  n.setOptions({
    title: username,
  });

  const { data, loading, error } = useQuery(GET_LISTINGS, { variables: { ownerId } });
  const { data: cData } = useQuery(GET_CURRENT_USER);

  console.log(cData);

  if (loading) return <LoadingIndicator />;
  if (error) return <Error error={error} />;

  return (
    <ScrollView>
      <UserInfoButton onPress={() => console.log('')} username={username} userPicture={userPicture} />

      <View style={s.userDetails}>
        {userDetails.map((user) => (
          <Box key={user.text} flexDirection="row" justifyContent="flex-start" py={[0, 3]}>
            <Icon name={user.iconName} size={24} color={theme.colors.mediumGrey} />
            <Text style={[s.text, s.detailText]}>{user.text}</Text>
          </Box>
        ))}
      </View>

      {cData.getCurrentUser.id !== ownerId && (
        <>
          <View style={s.box}>
            <Box flexDirection="row" justifyContent="space-between">
              <Button mode="outlined" style={{ width: '48%' }}>
                Message
              </Button>
              <Button mode="contained" style={{ width: '48%' }}>
                Follow
              </Button>
            </Box>
          </View>
          <View style={s.box}>
            <Box flexDirection="row" justifyContent="space-between">
              <View>
                <Text style={s.text}>Shop bundles</Text>
                <Text style={(s.text, { color: theme.colors.mediumGrey })}>Save on postage</Text>
              </View>
              <Button mode="contained">Follow</Button>
            </Box>
          </View>
        </>
      )}

      <View style={[s.box, s.list]}>
        {data.getListings.map((item: ListingProp) => (
          <ItemCard key={item.id} navigation={n} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default OtherProfile;

const s = StyleSheet.create({
  box: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: theme.colors.white,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: theme.fontSize.normal,
  },
  userDetails: {
    backgroundColor: theme.colors.white,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
  },
  detailRow: {
    paddingBottom: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  detailText: {
    paddingLeft: 10,
  },
});
