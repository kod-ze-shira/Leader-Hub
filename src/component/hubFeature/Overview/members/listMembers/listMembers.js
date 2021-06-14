import React,{ useEffect} from 'react';

export default function ListMembers() {
    useEffect(() => {
        if (props.members?.length !== 0)
            props.getMembersByProjectId()
    }, [])
    return(
        <>

        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMembersByProjectId: () => dispatch(actions.getMembersByProjectId())
    }
}
const mapStateToProps = (state) => {
    return {
        members: state.public_reducer.members
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListMembers)