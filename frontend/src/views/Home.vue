<template>
    <div>
        <AddDrone/>
        <RCData/>
    </div>
</template>

<script>
import RCData from "../components/RCData";
import AddDrone from "../components/AddDrone";

export default {
    name: 'Home',

    components: {
        AddDrone,
        RCData,
    }
}
</script>