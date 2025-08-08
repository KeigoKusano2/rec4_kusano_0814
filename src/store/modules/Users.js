// src/store/modules/Users.js
import axios from 'axios'; // axios をインポート

export default {
  namespaced: true,

  // 1. State: アプリケーション全体のデータを保持
  state: {
    password: '',
    insertResultMessage: '', // 登録結果メッセージ
    isIdDuplicate: false,    // ID重複のステータス
    idCheckMessage: '',      // IDチェックのメッセージ
    userGroups: [
      { label: '所属なし', value: -1 },
        { label: "赤組", value: 1 },
        { label: "青組", value: 2 },
        { label: "白組", value: 3 },
        { label: "黄組", value: 4 }
      ],      // APIから取得したユーザーグループリスト
    allUsersList: [],        // 全ユーザー情報リスト 
    selectAllResultMessage: '', // 全ユーザー検索結果メッセージ 
    searchedUser: null,      // 1件検索の結果ユーザーオブジェクト 
    searchResultMessage: '', // 1件検索結果メッセージ 
    idCheckUpMessage: '',    // 更新時のIDチェックメッセージ
    updateResultMessage: '', // 更新結果メッセージ
    isIdExistForUpdate: false, // 更新対象IDが存在するかどうかのフラグ
    userToUpdate: null,      // 更新対象のユーザー情報（ID入力後に自動入力用）
    idCheckDeMessage: '',    // 削除時のIDチェックメッセージ
    deleteResultMessage: '', // 削除結果メッセージ
    isIdExistForDelete: false, // 削除対象IDが存在するかどうかのフラグ
    // ログイン機能用
    isLoggedIn: false,
    loggedInUser: null,
    loginResultMessage: '',
    chatPartners: [], // ★ 新規追加: チャット相手のリストを保持
  },
  // 2. Getters: Stateから派生したデータを取得
  getters: {
    getInsertResultMessage: (state) => state.insertResultMessage,
    getIsIdDuplicate: (state) => state.isIdDuplicate,
    getIdCheckMessage: (state) => state.idCheckMessage,
    /*getGroupOptions: (state) => [{ label: '所属なし', value: -1 }].concat(
      state.userGroups.map(group => ({
        label: group.Name,
        value: group.ID
      }))
    ),*/
    getGroupOption2:(state) => state.userGroups,
    getAllUsersList: (state) => state.allUsersList,
    getSelectAllResultMessage: (state) => state.selectAllResultMessage, 
    getSearchedUser: (state) => state.searchedUser,      
    getSearchResultMessage: (state) => state.searchResultMessage, 
    getIdCheckUpMessage: (state) => state.idCheckUpMessage,
    getUpdateResultMessage: (state) => state.updateResultMessage,
    getIsIdExistForUpdate: (state) => state.isIdExistForUpdate,
    getUserToUpdate: (state) => state.userToUpdate,
    getIdCheckDeMessage: (state) => state.idCheckDeMessage,
    getDeleteResultMessage: (state) => state.deleteResultMessage,
    getIsIdExistForDelete: (state) => state.isIdExistForDelete,
    getUserGroupsList: (state) => state.userGroups,
    getIsLoggedIn: (state) => state.isLoggedIn,
    getLoggedInUser: (state) => state.loggedInUser,
    getLoginResultMessage: (state) => state.loginResultMessage,
    getChatPartners: (state) => state.chatPartners,
    
  },

  // 3. Mutations: Stateのデータを同期的に変更する唯一の方法
  mutations: {
    setInsertResultMessage(state, message) {
      state.insertResultMessage = message;
    },
    setIsIdDuplicate(state, status) {
      state.isIdDuplicate = status;
    },
    setIdCheckMessage(state, message) {
      state.idCheckMessage = message;
    },
    
    setAllUsersList(state, users) { 
      state.allUsersList = users;
    },
    setSelectAllResultMessage(state, message) { 
      state.selectAllResultMessage = message;
    },
    setSearchedUser(state, user) { 
      state.searchedUser = user;
    },
    setSearchResultMessage(state, message) { 
      state.searchResultMessage = message;
    },
    setIdCheckUpMessage(state, message) {
      state.idCheckUpMessage = message;
    },
    setUpdateResultMessage(state, message) {
      state.updateResultMessage = message;
    },
    setIsIdExistForUpdate(state, status) {
      state.isIdExistForUpdate = status;
    },
    setUserToUpdate(state, user) {
      state.userToUpdate = user;
    },
    setIdCheckDeMessage(state, message) {
      state.idCheckDeMessage = message;
    },
    setDeleteResultMessage(state, message) {
      state.deleteResultMessage = message;
    },
    setIsIdExistForDelete(state, status) {
      state.isIdExistForDelete = status;
    },
    clearUserRegisterForm(state) {  
      state.isIdDuplicate = false;
      state.idCheckMessage = '';
      state.insertResultMessage='';
      // フォームの入力値はViewコンポーネント側でクリアするため、Stateではクリアしない
    },
    clearAllUsersData(state) { 
      state.allUsersList = [];
      state.selectAllResultMessage = '';
    },
    clearSearchData(state) { 
      state.searchedUser = null;
      state.searchResultMessage = '';
    },
    clearUpdateForm(state) { // 更新フォームの状態をクリア
      state.idCheckUpMessage = '';
      state.isIdExistForUpdate = false;
      state.userToUpdate = null;
    },
    clearDeleteForm(state) { // 削除フォームの状態をクリア
      state.idCheckDeMessage = '';
      //state.deleteResultMessage = '';
      state.isIdExistForDelete = false;
    },
    // ログイン機能用
    setLoginState(state, { isLoggedIn, user }) {
      state.isLoggedIn = isLoggedIn;
      state.loggedInUser = user;
    },
    setLoginResultMessage(state, message) {
      state.loginResultMessage = message;
    },
    setChatPartners(state, partners) { // ★ 新規追加
            state.chatPartners = partners;
        },
  },

  // 4. Actions: 非同期処理などを実行し、その結果に基づいてMutationsをコミットする
  actions: {
    // ログイン処理（新しいAPIを使用）
  // ログイン処理
  async loginUser({ commit }, { ID, Password }) {
    commit('setLoginResultMessage', '');
    
    if (!ID || !Password) {
      commit('setLoginResultMessage', 'IDとパスワードを入力してください。');
      return { success: false };
    }

      const url = 'https://m3h-kusano-rec4.azurewebsites.net/api/SELECT_BY_IDPASSWORD?';
      
      const response = await axios.post(url, { ID: parseInt(ID), Password: Password });
      let responseData = response.data; 
      if(response.data.List.length>0&&responseData.List[0].ID==ID){
        const user = responseData.List[0];
        
        commit('setLoginState', { isLoggedIn: true, user: user });
        commit('setLoginResultMessage', 'ログイン成功！');
        return { success: true };
        
      } else {
        // ログイン失敗
        commit('setLoginState', { isLoggedIn: false, user: null });
        commit('setLoginResultMessage', 'IDまたはパスワードが間違っています。');
        return { success: false };
      }
    
  },
    
    // ログアウト処理
    logoutUser({ commit }) {
      commit('setLoginState', { isLoggedIn: false, user: null });
      commit('setLoginResultMessage', 'ログアウトしました。');
    },
    // ID重複チェックアクション
    async checkIdDuplication({ commit }, ID) {
      if (!ID || isNaN(ID)) {
        commit('setIsIdDuplicate', false);
        commit('setIdCheckMessage', '');
        return;
      }
        const url = 'https://m3h-kusano-rec4.azurewebsites.net/api/SELECT_BY_ID?'; // あなたのFunction Appの正しいURLに置き換えてください
        const response = await axios.post(url, { ID: parseInt(ID) });

        let responseData = response.data;
        
        if ((responseData && Array.isArray(responseData.List) && responseData.List.length > 0) || (responseData && typeof responseData === 'object' && responseData.ID)) {
          commit('setIsIdDuplicate', true);
          commit('setIdCheckMessage', "このIDは既に使われています。");
          console.log("ID重複検出: " + ID);
        } else {
          commit('setIsIdDuplicate', false);
          commit('setIdCheckMessage', "このIDは利用可能です。");
          console.log("IDは利用可能: " + ID);
        }
      
    },
    
    // ユーザー登録アクション (IDとPasswordを引数で受け取る)
    async registerUser({ commit }, userData) {
      if (!userData.ID || isNaN(userData.ID) || !userData.Password || userData.Password.length > 10 || !userData.Name || !userData.Email || !userData.Phone || !userData.Address || !userData.Birth) {
        commit('setInsertResultMessage', "入力漏れがあるか、パスワードの桁数が不正です。");
        return { success: false };
      }

      const param = {
        ID: parseInt(userData.ID), 
        Name: userData.Name, 
        Email: userData.Email, 
        Phone: userData.Phone, 
        Address: userData.Address, 
        Birth: userData.Birth, 
        Group: userData.Group,
        Password: userData.Password,
      };
        const url = 'https://m3h-kusano-rec4.azurewebsites.net/api/INSERT?';
        const response = await axios.post(url, param);
        let responseData = response.data;
        
        if (responseData && responseData.result) {
          commit('setInsertResultMessage', `ユーザーが正常に登録されました！ ${responseData.result}`);
        commit('setLoginState', { isLoggedIn: true, user: userData });
          return { success: true };
        } else if (responseData && responseData.error) {
          commit('setInsertResultMessage', `登録に失敗しました: ${responseData.error}`);
          return { success: false };
        } 
      
    },
    
    // 全ユーザー情報を取得するアクション (UserElectAllView用) (追加)
    async fetchAllUsers({ commit }) {
        const url = 'https://m3h-kusano-rec4.azurewebsites.net/api/SELECT?'; // あなたのFunction Appの正しいURLに置き換えてください
        const response = await axios.get(url);
        let responseData = response.data;
        if (responseData && Array.isArray(responseData.List)) {
          commit('setAllUsersList', responseData.List);
          commit('setSelectAllResultMessage', `${responseData.List.length} 件のユーザー情報を取得しました。`);
        } 
    },
 
    // IDでユーザーを検索するアクション (UserSelectView用) (追加)
    async fetchUserById({ commit }, searchId) {
      if (!searchId || isNaN(searchId)) {
        commit('setSearchResultMessage', "検索するIDに数値が入力されていません。");
        commit('setSearchedUser', null);
        return;
      }
      const param = {
        ID: parseInt(searchId),
      };

        const url = 'https://m3h-kusano-rec4.azurewebsites.net/api/SELECT_BY_ID?'; // あなたのFunction Appの正しいURLに置き換えてください
        const response = await axios.post(url, param);

        let responseData = response.data;
        
        if (responseData && Array.isArray(responseData.List) && responseData.List.length > 0) {
          commit('setSearchedUser', responseData.List[0]);
          commit('setSearchResultMessage', `ID ${searchId} のユーザーが見つかりました。`);
        } else {
          commit('setSearchedUser', null);
          commit('setSearchResultMessage', `ID ${searchId} のユーザーが見つかりませんでした。`);
        }
    },
    
    // ユーザー更新
  async updateUser({ commit, state }, userData) {
    if (!state.loggedInUser || state.loggedInUser.ID !== userData.ID) {
      return { success: false, message: '更新権限がありません。' };
    }
    if(!userData.Name||!userData.Email||!userData.Phone||!userData.Address||!userData.Birth||!userData.Group){
      return { success: false, message: '入力漏れがあります。' };
    }
    
    const param = {
      ID: userData.ID, 
      Name: userData.Name, 
      Email: userData.Email,
      Phone: userData.Phone,
      Address: userData.Address,
      Birth: userData.Birth,
      Group: userData.Group,
      Password: userData.Password
    };

      const url = 'https://m3h-kusano-rec4.azurewebsites.net/api/UPDATE?';
      const response = await axios.post(url, param);
      
      let responseData = response.data;
      
      if (responseData && responseData.result) {
          // ログイン中のユーザー情報を更新
          commit('setLoginState', {
              isLoggedIn: true,
              user: { 
                  ...state.loggedInUser,
                  ID: userData.ID,
                  Name: userData.Name,
                  Email: userData.Email,
                  Phone: userData.Phone,
                  Address: userData.Address,
                  Birth: userData.Birth,//Date_of_birth
                  Group: userData.Group,
                  Password: userData.Password

              }
          });
          return { success: true, message: `ユーザー情報が正常に更新されました！` };
      } 
  },
    // ユーザー削除
    async deleteUser({ commit, state }, ID) {
      if (state.loggedInUser.ID !== ID) {//state.loggedInUser.ID !== parseInt(ID)||
        return { success: false, message: '削除権限がありません。' };
      }
      const param = { ID: parseInt(ID) };
          const url = 'https://m3h-kusano-rec4.azurewebsites.net/api/DELETE?';
          const response = await axios.post(url, param);
          let responseData = response.data;

          if (responseData && responseData.result) {
              // 削除成功後、ログアウト
              commit('setLoginState', { isLoggedIn: false, user: null });
              return { success: true, message: `アカウントが正常に削除されました。` };
          }   
    },
    async fetchChatPartners({ commit }, userId) {
        try {
            const url = `https://m3h-kusano-rec4.azurewebsites.net/api/SELECT_ReceiverID?userId=${userId}`;
            const response = await axios.get(url);
            let responseData = response.data;
            if (responseData && responseData.List) {       
                commit('setChatPartners', responseData.List);
            }
        } catch (error) {
            console.error("Fetch Chat Partners API Error:", error);
        }
        
    },
  },
};