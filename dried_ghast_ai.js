const GhastShootFireballGoal = Java.loadClass(
    "net.minecraft.world.entity.monster.Ghast$GhastShootFireballGoal"
)

EntityJSEvents.addGoalSelectors(
    "kubejs:dried_ghast",
    event => {
        // Remove only the vanilla Ghast fireball attack goal.
        event.removeGoal(GhastShootFireballGoal)

        // Keep the working follow behavior.
        event.customGoal(
            "follow_player",
            1,
            mob => {
                const player = mob.level.getNearestPlayer(mob, 24)
                return player != null &&
                    mob.distanceToSqr(player) > 121
            },
            mob => {
                const player = mob.level.getNearestPlayer(mob, 24)
                return player != null &&
                    mob.distanceToSqr(player) > 121
            },
            true,
            mob => {},
            mob => {},
            true,
            mob => {
                const player = mob.level.getNearestPlayer(mob, 24)

                if (player != null && mob.distanceToSqr(player) > 121) {
                    mob.getMoveControl().setWantedPosition(
                        player.getX(),
                        player.getY() + 6,
                        player.getZ(),
                        1.0
                    )
                }
            }
        )
    }
)
