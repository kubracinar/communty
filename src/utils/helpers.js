export const getSortedList = (list, type = "") => {
    list.sort((a, b) => {
        let returnValue = 0;

        if (type === "") {
            if (a._id < b._id) returnValue = 1;
            if (a._id > b._id) returnValue = -1;

            return returnValue;
        }

        if (a.counter < b.counter) returnValue = -1;
        if (a.counter > b.counter) returnValue = 1;

        if (returnValue !== 0) {
            if (type === "desc") {
                return returnValue * -1;
            }

            return returnValue;
        }

        if (a._id < b._id) returnValue = 1;
        if (a._id > b._id) returnValue = -1;

        return returnValue;
    });

    return [...list];
};

export const vote = (state, id, type) => {
    return state.map(team => {
        if (team._id !== id) {
            return team;
        }

        if (type === "up") {
            team.votes++;
        } else {
            team.votes--;
        }

        return team;
    });
};