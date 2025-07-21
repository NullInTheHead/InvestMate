// import React, { useState } from 'react';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Account.css';
// import { doc, getDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";
// import { db } from "../firebase";

// useEffect(() => {
//   const getUserData = async () => {
//     const docRef = doc(db, "users", currentUser.uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       setUserData(docSnap.data());
//     }
//   };
//   getUserData();
// }, []);

// <form onSubmit={handleUpdate}>
//   <label>Full Name</label>
//   <input type="text" value={name} onChange={e => setName(e.target.value)} />
//   <label>New Password</label>
//   <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
//   <button type="submit">Update Settings</button>
// </form>


// const handleUpdate = async (e) => {
//     e.preventDefault();
//     await updateProfile(currentUser, { displayName: name });
//     if (newPassword) {
//       await updatePassword(currentUser, newPassword);
//     }
//     await setDoc(doc(db, "users", currentUser.uid), { fullName: name }, { merge: true });
//   };

//   <form onSubmit={handleFeedback}>
//   <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your feedback..." />
//   <button type="submit">Send Feedback</button>
// </form>

// const handleFeedback = async (e) => {
//     e.preventDefault();
//     await addDoc(collection(db, "feedback"), {
//       uid: currentUser.uid,
//       message,
//       timestamp: serverTimestamp()
//     });
//   };
  

// function Account() {
//     const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
// const [displayNameMsg, setDisplayNameMsg] = useState('');

//   const [activeTab, setActiveTab] = useState('settings');
//   const [email, setEmail] = useState(auth.currentUser?.email || '');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [feedbackStatus, setFeedbackStatus] = useState('');
//   const navigate = useNavigate();

//   const handleDisplayNameChange = async (e) => {
//     e.preventDefault();
//     try {
//       await auth.currentUser.updateProfile({ displayName });
//       setDisplayNameMsg("Display name updated successfully.");
//     } catch (err) {
//       setDisplayNameMsg("Error: " + err.message);
//     }
//   };
  
//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     try {
//       await auth.currentUser.updatePassword(password);
//       setMsg('Password updated');
//     } catch (err) {
//       setMsg(err.message);
//     }
//   };

//   const handleFeedbackSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const db = (await import('firebase/firestore')).getFirestore();
//       const { collection, addDoc } = await import('firebase/firestore');
//       await addDoc(collection(db, 'feedback'), { text: feedback, createdAt: new Date() });
//       setFeedback('');
//       setFeedbackStatus('Feedback submitted');
//     } catch (err) {
//       setFeedbackStatus('Error: ' + err.message);
//     }
//   };

//   const handleLogout = () => {
//     signOut(auth).then(() => navigate('/auth'));
//   };

//   return (
//     <div className="account-page">
//       <h2>Account Settings</h2>
//       <div className="tabs">
//         <button onClick={() => setActiveTab('settings')}>Settings</button>
//         <button onClick={() => setActiveTab('feedback')}>Feedback</button>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       {activeTab === 'settings' && (
//         <div className="tab-content">
//         <form onSubmit={handleDisplayNameChange}>
//           <label>Display Name</label>
//           <input
//             type="text"
//             value={displayName}
//             placeholder="New display name"
//             onChange={(e) => setDisplayName(e.target.value)}
//           />
//           <button type="submit">Update Display Name</button>
//           {displayNameMsg && <p>{displayNameMsg}</p>}
//         </form>
      
//         <form onSubmit={handlePasswordChange}>
//           <label>New Password</label>
//           <input
//             type="password"
//             value={password}
//             placeholder="New Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Update Password</button>
//           {msg && <p>{msg}</p>}
//         </form>
//       </div>
      
//       )}

//       {activeTab === 'feedback' && (
//         <div className="tab-content">
//           <form onSubmit={handleFeedbackSubmit}>
//             <textarea
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               placeholder="Enter your feedback..."
//               required
//             ></textarea>
//             <button type="submit">Submit Feedback</button>
//             {feedbackStatus && <p>{feedbackStatus}</p>}
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Account;

import React, { useState, useEffect } from 'react';
import { signOut, updateProfile, updatePassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/Account.css';
import { useAuth } from '../context/AuthContext';

function Account() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('settings');

  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');

  const [feedback, setFeedback] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState('');

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      if (!currentUser) return;
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setName(docSnap.data().fullName || '');
        }
      } catch (err) {
        console.error('Error fetching user data:', err.message);
      }
    };
    getUserData();
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (name) {
        await updateProfile(currentUser, { displayName: name });
        await setDoc(doc(db, 'users', currentUser.uid), { fullName: name }, { merge: true });
      }

      if (newPassword) {
        await updatePassword(currentUser, newPassword);
      }

      setSettingsMessage('Settings updated successfully!');
    } catch (err) {
      setSettingsMessage('Error: ' + err.message);
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'feedback'), {
        uid: currentUser.uid,
        message: feedback,
        timestamp: serverTimestamp()
      });
      setFeedback('');
      setFeedbackStatus('Feedback submitted successfully!');
    } catch (err) {
      setFeedbackStatus('Error: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  return (
    <div className="account-page">
      <h2>Account</h2>
      <div className="tabs">
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button
          className={activeTab === 'feedback' ? 'active' : ''}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {activeTab === 'settings' && (
        <div className="tab-content">
          <form onSubmit={handleUpdate}>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
            />

            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />

            <button type="submit">Update Settings</button>
            {settingsMessage && <p className="message">{settingsMessage}</p>}
          </form>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="tab-content">
          <form onSubmit={handleFeedback}>
            <label>Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback..."
              required
            ></textarea>
            <button type="submit">Send Feedback</button>
            {feedbackStatus && <p className="message">{feedbackStatus}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default Account;
