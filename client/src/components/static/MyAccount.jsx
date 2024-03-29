import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import { fetchFollowedEvents} from '../../redux/eventSlice';
import {UserContext} from '../../context/UserContext'

const MyAccount = () => {

  // console.log("user id: ", user);
  const dispatch = useDispatch();
  // const loggedIn = useSelector((state) => state.user.loggedIn);
  const followedEvents = useSelector((state) => state.event.followedEvents);
  const { user } = useContext(UserContext)

  console.log("user id", user.id)
  useEffect(() => {
    if (user) {
      dispatch(fetchFollowedEvents(user.id));
    }
  }, [user, dispatch])

  return (
    <div>
      <h2>My Account</h2>
      <h3>Followed Events</h3>
      <div className="race-event-cards">
        {followedEvents.map(event => (
          <div key={event.id} className="mb-3">
            <RaceEventCard 
              key={event.id}
              raceEvent={event} 
              userId = {user.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccount;
