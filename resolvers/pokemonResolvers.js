const resolvers = {
    Query: {
        allPokemonObjects: (parent, args, { dataSources }) => {},
        pokemon: (parent, args, { dataSources }) => args.id,
    },
    Pokemon: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonName(parent);
        },
        height: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonHeight(parent);
        },
        weight: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonWeight(parent);
        },
        nat_dex_num: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonNationalDexNum(parent);
        },
        is_baby: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonIsBaby(parent);
        },
        gender_rate: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenderRate(parent);
        },
        generation: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGeneration(parent);
        },
        base_stats: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonStats(parent);
        },
        genus: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenus(parent);
        },
        gender_rate: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenderRate(parent);
        },
        types: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonTypeIds(parent);
        },
        egg_groups: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonEggGroupIds(parent);
        },
        abilities: async (parent, args, { dataSources }) => {
            const abilityIds = await dataSources.db.getSinglePokemonAbilityIds(
                parent
            );
            const idsArray = abilityIds.map((abilityId) => {
                return {
                    pokemonId: parent,
                    abilityId: abilityId,
                    gameName: args.game,
                };
            });

            return idsArray;
        },
        games: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGameIds(parent);
        },
        locations: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonLocationIds(parent);
        },
        moves: async (parent, args, { dataSources }) => {
            // console.log('parent: ', parent);
            // console.log('args: ', args);

            const moveIds = await dataSources.db.getSinglePokemonMoveIds(
                parent,
                args.game
            );

            // console.log('moveIds: ', moveIds);
            const idsArray = moveIds.map((moveId) => {
                return {
                    pokemonId: parent,
                    moveId: moveId,
                    gameName: args.game,
                };
            });
            // console.log('idsArray: ', idsArray);

            return idsArray;
        },
    },
    Stats: {
        hp: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'hp');
            return hp.base_stat;
        },
        attack: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'attack');
            return hp.base_stat;
        },
        defense: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'defense');
            return hp.base_stat;
        },
        special_attack: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'special-attack');
            return hp.base_stat;
        },
        special_defense: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'special-defense');
            return hp.base_stat;
        },
        speed: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'speed');
            return hp.base_stat;
        },
    },
    Type: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeName(parent);
        },
        double_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeDoubleDamageFromIds(parent);
        },
        double_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeDoubleDamageToIds(parent);
        },
        half_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeHalfDamageFromIds(parent);
        },
        half_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeHalfDamageToIds(parent);
        },
        no_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeNoDamageToIds(parent);
        },
        no_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeNoDamageFromIds(parent);
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getPokemonIdsForType(parent);
        },
    },
    EggGroup: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getEggGroupName(parent);
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getEggGroupPokemonIds(parent);
        },
    },
    Ability: {
        id: (parent, args, { dataSources }) => parent.abilityId,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getAbilityName(parent.abilityId);
        },
        is_hidden: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonAbilitiesIsHidden(
                parent.pokemonId,
                parent.abilityId
            );
        },
        effect: (parent, args, { dataSources }) => {
            return dataSources.db.getAbilityEffect(parent.abilityId);
        },
        description: (parent, args, { dataSources }) => {
            return dataSources.db.getAbilityDescription(
                parent.abilityId,
                parent.gameName
            );
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getAbilityPokemonIds(parent.abilityId);
        },
    },
    Game: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getGameName(parent);
        },
        generation: (parent, args, { dataSources }) => {
            return dataSources.db.getGameGeneration(parent);
        },
        regions: (parent, args, { dataSources }) => {
            return dataSources.db.getGameRegionIds(parent);
        },
    },
    Region: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getRegionName(parent);
        },
        games: (parent, args, { dataSources }) => {
            return dataSources.db.getRegionGameIds(parent);
        },
        locations: (parent, args, { dataSources }) => {
            return dataSources.db.getRegionLocationIds(parent);
        },
    },
    Location: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getLocationName(parent);
        },
        games: (parent, args, { dataSources }) => {
            return dataSources.db.getLocationGameIds(parent);
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getLocationPokemonIds(parent);
        },
    },
    Move: {
        id: (parent, args, { dataSources }) => parent.moveId,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveName(parent.moveId);
        },
        type: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveTypeId(parent.moveId);
        },
        power: (parent, args, { dataSources }) => {
            return dataSources.db.getMovePower(parent.moveId);
        },
        pp: (parent, args, { dataSources }) => {
            return dataSources.db.getMovePp(parent.moveId);
        },
        accuracy: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveAccuracy(parent.moveId);
        },
        priority: (parent, args, { dataSources }) => {
            return dataSources.db.getMovePriority(parent.moveId);
        },
        damage_class: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveDamageClass(parent.moveId);
        },
        ailment: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveAilment(parent.moveId);
        },
        effect_chance: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveEffectChance(parent.moveId);
        },
        effect: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveEffect(parent.moveId);
        },
        description: (parent, args, { dataSources }) => {
            // console.log('parent: ', parent);
            return dataSources.db.getMoveDescription(
                parent.moveId,
                parent.gameName
            );
        },
        learn_method: (parent, args, { dataSources }) => {
            // console.log('parent: ', parent);
            return dataSources.db.getSinglePokemonMoveLearnMethod(
                parent.pokemonId,
                parent.moveId,
                parent.gameName
            );
        },
        level_learned_at: (parent, args, { dataSources }) => {
            // console.log('parent: ', parent);
            return dataSources.db.getSinglePokemonMoveLevelLearnedAt(
                parent.pokemonId,
                parent.moveId,
                parent.gameName
            );
        },
    },
};

module.exports = { resolvers };
