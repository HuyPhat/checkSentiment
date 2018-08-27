import { notify, addNotification, updateNotification, removeNotification } from 'reapop';
import * as assignConst from "../constants/assignment";
import app from "../../feathers-client/app";

function changeStatusOfUser(id, fromUser, toUser) {
  return new Promise(function (resolve, reject) {
    return app.service('contents').update(id, {
      $set: {
        assigned: true,
        assign_from: fromUser,
        assign_to: toUser
      }
    }).then(updated => {
      resolve({ id, status: true });
    }).catch(err => {
      resolve({ id, status: false, err });
    });
  });
}

async function doAssignForUserList(serviceName, fromuser, userList, numberRecords, ffrom, fto) {
  try {
    const totalRecord = userList.length * numberRecords;
    const queryCondition = {
      query: {
        $limit: totalRecord,
        content_type: serviceName,
        assigned: false,
        created_date: { $gte: ffrom, $lt: fto },
        sentiments: {
          $elemMatch: {
            brand: { $ne: 'PTO' }
          }
        },
      }
    }
    let records = await app.service('contents').find(queryCondition);
    console.log('record data ', records.total);
    const arrPromise = [];
    userList.forEach((toUser, index) => {
      let flag = index * numberRecords;
      let size = (index + 1) * numberRecords;
      console.log('flag ', flag, size);
      if (size > records.total) {
        size = records.total;
      }
      for (let i = flag; i < size; i++) {
        arrPromise.push(changeStatusOfUser(records.data[i]._id, fromuser, toUser));
      }
    });
    const results = await Promise.all(arrPromise);
    console.log("results >>> ", results);
    let totalSuccess = 0;
    results.map(re => {
      if (re.status) {
        totalSuccess += 1;
      }
      else {
        console.log(re.err + ', ' + re.id);
      }
    })
    console.log(`Total Success assignments ${totalSuccess}`);
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
}

export const requestAssign = (
  serviceName,
  fromUser,
  userList,
  numberRecords,
  ffrom,
  fto
) => {
  return async (dispatch, getState) => {
    try {
      let notif = addNotification({
        title: 'Assign New Content',
        message: 'Assignment is almost done...Please wait!',
        status: 'info',
        dismissible: false,
        dismissAfter: 0
      })
      dispatch(doAssign());
      dispatch(notif);
      await doAssignForUserList(serviceName, fromUser, userList, numberRecords, ffrom, fto);
      dispatch(assignSuccessed());
      notif.message = 'New Content has been successfully assigned';
      notif.status = 'success';
      notif.dismissible = true;
      notif.dismissAfter = 3000;
      setTimeout(function () {
        dispatch(removeNotification(getState().notifications[0].id))
        dispatch(notify(notif));
      }, 3000);
      return Promise.resolve();
    } catch (e) {
      dispatch(assignFailed(e));
      return Promise.reject();
    }
  };
};

export const doAssign = () => {
  return {
    type: assignConst.DO_ASSIGN
  };
};

export const assignSuccessed = () => {
  return {
    type: assignConst.ASSIGN_SUCCESSED
  };
};

export const assignFailed = error => {
  return {
    type: assignConst.ASSIGN_FAILED,
    payload: error
  };
};
