import Reflux from 'reflux';
import MeActions from '../actions/MeActions'


  class MeStore extends Reflux.Store {

    constructor (props) {
      super(props);
      this.listenables = MeActions;
      this.state = {userInfo: {firstName:'Radoslav',lastName:'Naydenov',age:20,sex:'male',motherLanguage:'Bulgarian',familiarLanguages:[{name:'English',level:'C2'},{name:'Spanish',level:'B1'}],interests:[]}};
    }

    updateMotherLanguage = (e) => {
      this.setState({updatingMotherLang:e.target.value});
    }



}

export default MeStore;
