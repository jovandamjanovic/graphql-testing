const resolvers = ({ User }) => ({
    Query: {
        getUserById(root, { id }) {
            return User.findById(id).then((response) => response);
        },

        getUserByEmail(root, { email }) {
            return User.findOne({ email }).then((response) => response);
        },

        user() {
            return User.find().then(response => response);
        },

        friends(root, { id }) {
            return User.findById(id).then((user) => {
                return user.friends;
            });
        }
    },
    Mutation: {
        createUser(root, args) {
            const user = new User(args);
            return user.save().then((response) => response);
        },

        addFriend(root, { id, friendId }) {
            return User.findById(id, (err, user) => {
                User.findById(friendId, (err, friend) => {
                    user.friends.push(friend);
                    friend.friends.push(user);
                    friend.save();
                    return user.save().then(response => response);
                });
            });
        }
    }
});

module.exports = resolvers;