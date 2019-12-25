// axios already imported at app.js
const state = {
    bugs: [],
    bug_details: {
        project: {},
        assigned_to: {}
    }
};
const getters = {
    bugs: state => state.bugs,
    bug_details: state => state.bug_details
};
const actions = {
    getBugs: async ({ commit }) => {
        try {
            const result = await axios.get("api_web_session/v1/bugs");
            commit("setBugs", result.data);
            // console.log(result);
        } catch (error) {
            alert(error);
            // console.log(error.response);
        }
    },
    newBug: async ({ commit }, bug) => {
        // we append our data
        let formData = new FormData();

        formData.append("title", bug.title);
        formData.append("project_id", bug.project);
        formData.append("description", bug.description);
        formData.append("browser", bug.browser);
        formData.append("os", bug.os);
        formData.append("bug_type", bug.type);
        formData.append("severity", bug.severity);
        formData.append("priority", bug.priority);
        formData.append("developer", bug.developer);
        if (bug.image) {
            formData.append("image", bug.image);
        }
        try {
            const result = await axios.post(
                "api_web_session/v1/bugs",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "content-type": "multipart/form-data"
                    }
                }
            );
            commit("insertBug", result.data);
            alert(`${result.statusText},a Bug is successfuly added.`);
            // console.log(result);
        } catch (error) {
            // console.log(error.response);
            alert(error);
        }
    },
    getBugDetails: async ({ commit }, id) => {
        try {
            const result = await axios.get(`api_web_session/v1/bugs/${id}`);
            // console.log(result);
            commit("setBugDetails", result.data);
        } catch (error) {
            alert(error);
            // console.log(error.response);
        }
    },
    clearBugDetails: ({ commit }) => {
        // console.log("remove...");
        commit("removeBugDetails");
    }
};
const mutations = {
    setBugs: (state, bugs) => (state.bugs = bugs),
    insertBug: (state, bug) => state.bugs.unshift(bug),
    setBugDetails: (state, bug_details) => (state.bug_details = bug_details),
    removeBugDetails: state =>
        (state.bug_details = {
            project: {},
            assigned_to: {}
        })
};

export default {
    state,
    getters,
    actions,
    mutations
};
