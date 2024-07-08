import { autorun, makeAutoObservable, toJS } from "mobx";

class UserS {
  user: any | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (newUser: any) => {
    if (!newUser) {
      this.user = null;
      return;
    }
    const { photoURL, uid, displayName, email, role } = newUser;
    this.user = { photoURL, userId: uid, displayName, email, role };
  };

  updateUser = (newUser: any) => {
    const { photoURL, uid, displayName, email } = newUser;
    this.user = { ...this.user, photoURL, uid, displayName, email };
  };
}

const userStore = new UserS();
export default userStore;

autorun(() => {
  console.log(toJS(userStore.user));
});
