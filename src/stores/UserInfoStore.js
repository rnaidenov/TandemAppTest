import Reflux from 'reflux';
import UserInfoActions from '../actions/UserInfoActions';


class UserInfoStore extends Reflux.Store {
  constructor() {
    super();
    this.state({laina:false});
    this.listenables = UserInfoActions;
  }


  sayHi () {
      console.log("Hi");
      this.setState({laina:true});
  }

}

export default UserInfoStore;
