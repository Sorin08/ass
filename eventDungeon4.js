javascript: (() => {
var DungeonCrawlerEvent;
! function() {
    "use strict";
    DungeonCrawlerEvent = function() {
        return {
            initEnergy: function(e, n, t, r) {
                a.init(e, n, t, r)
            },
            initRanking: function(e, a, t) {
                n.init(e, a, t)
            },
            initDungeon: function(a, n, t, r, l) {
                e.init(a, n, t, r, l)
            }
        }
    }();
    var e = function() {
            var e, t, r = !1;

            function l(n, t) {
                if (e = n) r || (mobile ? (p = '<div class="mobileKeyValue"><h3>' + _("cd701b6fb06d4e424da1010f9bf86fe3") + '</h3><div class="dungeon-crawler-level-info"><span>' + _("46e888cc716ac8ec6fad01e85eb7c37c") + '</span><span class="level-info">' + e.dungeon_level + '</span></div><div class="dungeon-crawler-reward-info"><span>' + _("be66624c366745f399f15905518bfc48") + '</span><span class="reward-info"></span></div><div class="dungeon-crawler-enemy-info-damage"><span class="damage-label">' + _("40bacc45e190dbfb386ebd42459cc838") + '</span><span><span class="min-damage"></span> - <span class="max-damage"></span></span></div><div class="center"><button class="btn btn-pp dungeon-crawler-reveal-btn" data-feature="\\Ig\\TribalWars\\Events\\DungeonCrawler\\PremiumFeatures\\EventDungeonCrawlerRevealEnemies" data-cost="' + (e.reveal_feature_used + 1) * e.reveal_feature_cost + '">' + _("084e614bb66cf1a6519bec760cffccfb") + '</button></div></div><div class="dungeon-crawler-dungeon"><div class="dungeon-crawler-tiles"></div></div><div class="mobileKeyValue"><h3>' + _("4422c9a55126518c028eb572052d3991") + '</h3><div class="dungeon-crawler-player-info-health"><span>' + _("5f693d30197fd197814553091d79eacb") + '</span><span class="health-info">' + e.health + '</span></div><div class="dungeon-crawler-player-info-damage"><span>' + _("4a6cfb5ce8f12f72b7c8f85f56d9d041") + '</span><span><span class="min-damage"></span> - <span class="max-damage"></span></span></div><div class="dungeon-crawler-player-info-evasion"><span>' + _("0cfc288135c204778cc3fb90f91ca30d") + "</span><span>" + e.evasion + '%</span></div><div class="center"><button class="btn btn-pp dungeon-crawler-heal-btn" data-feature="\\Ig\\TribalWars\\Events\\DungeonCrawler\\PremiumFeatures\\EventDungeonCrawlerHeal" data-cost="' + (e.heal_feature_used + 1) * e.heal_feature_cost + '" data-days="' + e.dungeon_level + '">' + _("f72eb29b9456fe663a4cb753b874ccda") + "</button></div></div>", $(".dungeon-crawler-container").html(p), r = !0) : function() {
                        var a = '<div class="dungeon-crawler-level-info"><p>' + _("46e888cc716ac8ec6fad01e85eb7c37c") + '<span class="level-info">' + e.dungeon_level + '</span></p></div><div class="dungeon-crawler-reward-info tooltip" title="' + _("4679a4745c6e2a67a1000464acd37931") + '"><p><img src="/graphic/events/dungeon_crawler/icon_currency_crm.png" class="event-icon"><span class="reward-info"></span></p></div><div class="dungeon-crawler-tiles"></div><div class="dungeon-crawler-player-info"><button class="btn btn-pp dungeon-crawler-heal-btn" data-feature="\\Ig\\TribalWars\\Events\\DungeonCrawler\\PremiumFeatures\\EventDungeonCrawlerHeal" data-cost="' + (e.heal_feature_used + 1) * e.heal_feature_cost + '" data-days="' + e.dungeon_level + '">' + _("f357105e6becc3076a3da9b43465051a") + '</button><div class="dungeon-crawler-player-info-boxes"><div class="dungeon-crawler-player-info-health tooltip" title="' + _("cb892c9bd1643852151d290d1b280e77") + '"><p><img src="/graphic/events/dungeon_crawler/booster_health.png" class="event-icon"><span class="health-info">' + e.health + '</span></p></div><div class="dungeon-crawler-player-info-damage tooltip" title="' + _("16a44e0078fc58d97206d595548b5337") + '"><p><img src="/graphic/events/dungeon_crawler/booster_damage.png" class="event-icon"><span class="min-damage">' + e.min_damage + '</span> - <span class="max-damage">' + e.max_damage + '</span></p></div><div class="dungeon-crawler-player-info-evasion tooltip" title="' + _("3cd41cfc061553eec16737ff36ec06c2") + '"><p><img src="/graphic/events/dungeon_crawler/evasion_icon.png" class="event-icon">' + e.evasion + '%</p></div></div></div><div class="dungeon-crawler-enemy-info"><button class="btn btn-pp dungeon-crawler-reveal-btn" data-feature="\\Ig\\TribalWars\\Events\\DungeonCrawler\\PremiumFeatures\\EventDungeonCrawlerRevealEnemies" data-cost="' + (e.reveal_feature_used + 1) * e.reveal_feature_cost + '">' + _("393c3f5ea8ad35c02691d507bdbb31b0") + '</button><div class="dungeon-crawler-enemy-info-boxes"><div class="dungeon-crawler-enemy-info-damage tooltip" title="' + _("3748efe70c216af1c782b271414c9ee5") + '"><p><span class="min-damage"></span> - <span class="max-damage"></span><img src="/graphic/events/dungeon_crawler/booster_damage.png" class="event-icon"></p></div></div></div>';
                        $(".dungeon-crawler-dungeon").html(a), $(".dungeon-crawler-dungeon").css("height", "715px"), UI.ToolTip(".tooltip"), r = !0
                    }(), function() {
                        var e = $(".dungeon-crawler-heal-btn");
                        e.attr("title", _("3d69373aef42848c60cf6d20354727e6") + "<br /><br />" + Format.ppCostTooltip(e.data("cost"))), e.addClass("btn-pp-tooltip"), e.click(function(e) {
                            e.preventDefault(), Premium.check($(this).data("feature"), $(this).data("cost"), function() {
                                TribalWars.post("event_dungeon_crawler", {
                                    ajaxaction: "heal"
                                }, {}, function(e) {
                                    if (o(e), e.new_cost) {
                                        var a = $(".dungeon-crawler-heal-btn");
                                        a.data("cost", e.new_cost), a.attr("title", _("3d69373aef42848c60cf6d20354727e6") + "<br /><br />" + Format.ppCostTooltip(a.data("cost"))), UI.ToolTip(".btn-pp-tooltip")
                                    }
                                }), $(".dungeon-crawler-heal-btn").removeClass("btn-disabled")
                            }, $(this).data("days"))
                        });
                        var a = $(".dungeon-crawler-reveal-btn");
                        a.hasClass("btn-locked") || (a.attr("title", _("0e4d323557e75568958a2f5e3aaabf4b") + "<br /><br />" + Format.ppCostTooltip(a.data("cost"))), a.addClass("btn-pp-tooltip"));
                        a.click(function(e) {
                            $(this).hasClass("btn-locked") || (e.preventDefault(), Premium.check($(this).data("feature"), $(this).data("cost"), function() {
                                TribalWars.post("event_dungeon_crawler", {
                                    ajaxaction: "reveal_enemies"
                                }, {}, function(e) {
                                    if (o(e), e.new_cost) {
                                        var a = $(".dungeon-crawler-reveal-btn");
                                        a.data("cost", e.new_cost), a.attr("title", _("0e4d323557e75568958a2f5e3aaabf4b") + "<br /><br />" + Format.ppCostTooltip(a.data("cost"))), UI.ToolTip(".btn-pp-tooltip")
                                    }
                                })
                            }))
                        }), UI.ToolTip(".btn-pp-tooltip")
                    }()), f = $(".dungeon-crawler-level-info .level-info"), b = $(".dungeon-crawler-heal-btn"), u(f, parseInt(f.html()), e.dungeon_level, "omg-message-level"), f.html(e.dungeon_level), b.attr("data-days", e.dungeon_level), b.data("days", e.dungeon_level), i = $(".dungeon-crawler-player-info-health span.health-info"), d = $(".dungeon-crawler-player-info-damage span.min-damage"), g = $(".dungeon-crawler-player-info-damage span.max-damage"), u(i, parseInt(i.html()), e.health, "omg-message-health"), i.html(e.health), u(d, parseInt(d.html()), e.min_damage, "omg-message-damage"), d.html(e.min_damage), g.html(e.max_damage),
                    function() {
                        var a = $(".dungeon-crawler-tiles"),
                            n = Object.entries(e.tiles).map(function(e) {
                                return function(e, a) {
                                    var n, t = "",
                                        r = "";
                                    switch (a.state) {
                                        case "available":
                                        case "clickable":
                                            r += '<a class="dungeon-crawler-clickable" data-state="' + a.state + '" data-coordinates="' + e + '" href="#"></a>'
                                    }
                                    if ("clickable" === a.state) switch (a.type) {
                                        case "booster_damage":
                                            r += '<span class="dungeon-crawler-item dungeon-crawler-item-' + a.type + '"></span>', n = _("9e01ac3303b235d99958cf1780ba78f1");
                                            break;
                                        case "booster_health":
                                            r += '<span class="dungeon-crawler-item dungeon-crawler-item-' + a.type + '"></span>', n = _("9801f69bc7f085ff94830b19dc3d4f48");
                                            break;
                                        case "enemy":
                                            var l = $(".tile-" + e + " p.dungeon-crawler-health-bar span");
                                            u(l, parseInt(l.html()), a.enemy.health, "omg-message-health"), r += '<p class="dungeon-crawler-health-bar">' + _("c4b84a651c0a8aa9a157ce990e078155") + "<span>" + a.enemy.health + "</span></p>", r += '<span class="dungeon-crawler-item dungeon-crawler-item-' + a.type + '"></span>', n = _("4ed5e184187966d1cec99cc888c04631");
                                            break;
                                        case "exit":
                                            n = _("8f4fea41fc40d505efe15c5a3a17ed7d")
                                    } else "visited" !== a.state && a.revealed && (r += '<span class="dungeon-crawler-item dungeon-crawler-item-enemy"></span>');
                                    t = '<div class="dungeon-crawler-tile tile-' + e, n && (t += ' tile-tooltip" title="' + n);
                                    return t += '" style="background-image: url(\'/graphic/events/dungeon_crawler/map/' + a.image + "')\">" + r + "</div>"
                                }(e[0], e[1])
                            }).join("");
                        a.html(n), UI.ToolTip(".tile-tooltip")
                    }(), $(".dungeon-crawler-clickable").click(function(a) {
                        if (a.preventDefault(), !$(this).hasClass("tile-locked")) {
                            $(".dungeon-crawler-clickable").addClass("tile-locked");
                            var n = e.tiles[$(this).data("coordinates")];
                            switch ($(this).data("state")) {
                                case "available":
                                    ! function(e) {
                                        TribalWars.post("event_dungeon_crawler", {
                                            ajaxaction: "reveal_tile"
                                        }, {
                                            tile_id: e.tile_id
                                        }, function(e) {
                                            o(e)
                                        })
                                    }(n);
                                    break;
                                case "clickable":
                                    ! function(e) {
                                        switch (e.type) {
                                            case "booster_damage":
                                            case "booster_health":
                                            case "exit":
                                            case "enemy":
                                                TribalWars.post("event_dungeon_crawler", {
                                                    ajaxaction: "click_tile"
                                                }, {
                                                    tile_id: e.tile_id
                                                }, function(e) {
                                                    o(e)
                                                })
                                        }
                                    }(n)
                            }
                            $(".dungeon-crawler-clickable").removeClass("tile-locked")
                        }
                    });
                else {
                    var l = _("eeb4240d943b444c8f377f5621d18132");
                    t && ("abandoned" === t ? l = _("619f09953cf27d992db437e27f3edbcf") : "ended" === t && (l = _("50ba4015aafd370c4115a91146ef2c33"))), mobile ? function(e) {
                        var a = '<div class="dungeon-crawler-new-game border-frame-gold-red"><h1>' + e + "</h1></div>";
                        $(".dungeon-crawler-container").html(a), r = !1
                    }(l) : function(e) {
                        var a = '<div class="dungeon-crawler-new-game"><div class="dungeon-crawler-new-game-info"><h1>' + e + "</h1></div></div>";
                        $(".dungeon-crawler-dungeon").html(a), $(".dungeon-crawler-dungeon").css("height", "200px"), r = !1
                    }(l)
                }
                var i, d, g, f, b, p;
                ! function() {
                    var n = $(".dungeon-crawler-restart");
                    if (n.html(""), e) {
                        var t = "<h3>" + _("46bbbd11f21385e4288c208a6af99e07") + "</h3>",
                            r = "<p>" + s(_("675af16dd268a6edf7ab020c05c6947c"), e.dungeon_level > 25 ? 25 : e.dungeon_level) + "</p>",
                            l = '<button class="btn">' + _("46bbbd11f21385e4288c208a6af99e07") + "</button>";
                        mobile && (r = "<div>" + r + "</div>", l = '<div class="center">' + l + "</div>"), n.append(t).append(r).append(l);
                        var i = $(".dungeon-crawler-restart button");
                        i.click(function() {
                            var e = [{
                                text: _("46bbbd11f21385e4288c208a6af99e07"),
                                callback: c,
                                confirm: !0
                            }, {
                                text: _("19597673995bfb4f0b56e15ddf5c13dd"),
                                callback: function() {},
                                cancel: !0
                            }];
                            UI.ConfirmationBox(_("82e736d78aaf7827f10ceb1b9c601a5d"), e, "confirmation-box", !0)
                        })
                    } else {
                        var t = "<h3>" + _("4ecaebbee45c628592b01c1ad547130c") + "</h3>",
                            r = "<p>" + _("7d4f7b07c6332321ef33c02320d08278") + "</p>",
                            l = '<button class="btn btn-need-energy btn-confirm-yes">' + _("4ecaebbee45c628592b01c1ad547130c") + "</button>";
                        mobile && (r = "<div>" + r + "</div>", l = '<div class="center">' + l + "</div>"), n.append(t).append(r).append(l);
                        var i = $(".dungeon-crawler-restart button");
                        i.click(function() {
                            ! function() {
                                if (a.getEnergyValue("guard") < 1) return void UI.ErrorMessage(_("36da8538100a14edb6745886b302c17d"));
                                TribalWars.post("event_dungeon_crawler", {
                                    ajaxaction: "start_run"
                                }, {}, function(e) {
                                    o(e)
                                })
                            }()
                        })
                    }
                }()
            }

            function c() {
                TribalWars.post("event_dungeon_crawler", {
                    ajaxaction: "abandon_run"
                }, {}, function(e) {
                    o(e)
                })
            }

            function i(e) {
                t = e,
                    function() {
                        var e = $(".dungeon-crawler-log-entries"),
                            a = "";
                        if (mobile) {
                            var n = function(e) {
                                return "<div><span>" + e.message + "</span><span></span></div>"
                            };
                            a += "<h3>" + _("d1e66f011e1a9303c54185a94883c120") + "</h3>"
                        } else var n = function(e) {
                            return "<li>" + e.message + "</li>"
                        };
                        a += t.map(function(e) {
                            return n(e)
                        }).join(""), e.html(a)
                    }()
            }

            function d(e) {
                var a, n;
                ! function(e) {
                    var a = $(".dungeon-crawler-enemy-info-damage"),
                        n = $(".dungeon-crawler-enemy-info-damage span.min-damage"),
                        t = $(".dungeon-crawler-enemy-info-damage span.max-damage"),
                        r = $(".dungeon-crawler-enemy-info-damage img"),
                        l = e.base_min_damage,
                        c = e.base_max_damage,
                        s = $(".dungeon-crawler-enemy-info-damage span.damage-label");
                    if (e.visible_enemies > 0) var l = e.min_damage,
                        c = e.max_damage;
                    u(a, parseInt(n.html()), l, "omg-message-enemy-damage"), e.min_damage > e.base_min_damage ? (r.attr("src", "/graphic/events/dungeon_crawler/increased_damage_icon.png"), a.attr("title", _("6971e3d1cd6e024d5d866b47937ec315")), mobile && s.html(_("c05bff73b2fe4b57f13c8e5d12de5913"))) : (r.attr("src", "/graphic/events/dungeon_crawler/booster_damage.png"), a.attr("title", _("3748efe70c216af1c782b271414c9ee5")), mobile && s.html(_("d823bc07e206f702aaa797bbb9b781f4")));
                    n.html(l), t.html(c), UI.ToolTip(".dungeon-crawler-enemy-info-damage")
                }(e), e.reveal_feature_disabled ? $(".dungeon-crawler-reveal-btn").addClass("btn-locked").addClass("btn-disabled") : $(".dungeon-crawler-reveal-btn").removeClass("btn-locked").removeClass("btn-disabled"), a = e.reward, n = $(".dungeon-crawler-reward-info span.reward-info"), mobile ? (a.enemy > 0 && u(n, parseInt($(".dungeon-crawler-reward-info span.reward-info .event-currency-display").html()), a.total, "omg-message-health"), n.html(a.html)) : (a.enemy > 0 && u(n, parseInt(n.html()), a.total, "omg-message-health"), n.html(a.total))
            }

            function o(e) {
                if ("undefined" !== e.run && l(e.run, e.old_run_status), e.logs && i(e.logs), e.enemy_defeated && UI.OmgMessage($(".tile-" + e.enemy_defeated), _("171e33a0853c270a1609b29ce5e2e45d")), e.enemy_evaded && UI.OmgMessage($(".tile-" + e.enemy_evaded), _("18e565bc4a892e40cc2ce7c07c75dd0d")), e.enemy_info && d(e.enemy_info), e.ranking_finished_levels && n.setFinishedLevelsRankings(e.ranking_finished_levels), e.ranking_highest_level && n.setHighestLevelRanking(e.ranking_highest_level), e.player_energies && a.setEnergies(e.player_energies), e.currency) {
                    var t = $(".stolen-goods-box .event-currency-display");
                    t.html(Format.number(e.currency)), e.currency_reward && UI.OmgMessage(t, "+" + e.currency_reward)
                }
                e.quests && $(".dungeon-crawler-quests").html(e.quests)
            }

            function u(e, a, n, t) {
                var r = n - a;
                r > 0 ? UI.OmgMessage(e, "+" + r, t) : r < 0 && UI.OmgMessage(e, r, t + "-minus")
            }
            return {
                init: function(e, a, n, t) {
                    l(e, a), i(n), t && d(t), Timing.tickHandlers.timers.initTimers("countdown", function() {
                        $(this).html(_("dd2677d07f29951449ecbd2ab3b896eb")), setTimeout(function() {
                            window.location.reload()
                        }, 5e3)
                    })
                }
            }
        }(),
        a = function() {
            var e, a, n, t;

            function r() {
                var r = $("#dungeon_crawler_energy_parent"),
                    l = $("#dungeon_crawler_energy_display"),
                    c = $("#buy-energy-link"),
                    i = e[n],
                    d = i.energy_type,
                    o = i.getValue(),
                    u = i.getMaxValue();
                l.text(s("%1 / %2", o, u));
                var g = d.description + " :: ";
                if (o >= u) c.hide(), g = s(_("0b53b851d63bc5d29ee3ff616a3aee11"), d.name);
                else {
                    a.enabled && c.show();
                    var f = Format.timeSpan(1e3 * t - Date.now(), !1);
                    g += s(_("313b40dd3a7d943c02050a81b9d0e6dd"), d.name_plural, f)
                }
                r.attr("title", g).trigger("tooltip_change"), $(".btn-need-energy").toggleClass("btn-disabled", o < 1)
            }
            return {
                init: function(l, c, s, i) {
                    n = c, e = EventPlayerEnergy.createMapFromDTO(l), a = new EventEnergyShop(s, e), t = i, $("#buy-energy-link").on("click", function(e) {
                        e.preventDefault(), a.ui.openPopup()
                    }), e[n].onChange(function() {
                        r()
                    }), $(window.TribalWars).on("global_tick", function() {
                        r()
                    })
                },
                getEnergyValue: function(a) {
                    return e[a].getValue()
                },
                setEnergies: function(a) {
                    $.each(e, function(e, n) {
                        a[e] && n.update(a[e])
                    })
                },
                updateCurrentCycleEnd: function(e) {
                    t = e
                }
            }
        }(),
        n = function() {
            var e, a;

            function n(a, n) {
                var t = $("div." + a + " tbody.entries"),
                    r = n.map(function(a) {
                        return n = a, "<tr" + (window.game_data.player.id == n.object_id ? ' class="is_me"' : "") + "><td>" + n.rank + "</td><td>" + Format.playerAnchor(n.player_id, n.player_name) + "</td><td>" + n.score + '</td><td><img src="' + e + '" class="event-mini-icon"> ' + n.reward + "</td></tr>";
                        var n
                    }).join("");
                t.html(r)
            }
            return {
                init: function(t, r, l) {
                    e = t, a = l, n("finished-levels", r), n("highest-level", a)
                },
                setFinishedLevelsRankings: function(e) {
                    n("finished-levels", e)
                },
                setHighestLevelRanking: function(e) {
                    n("highest-level", a = e)
                }
            }
        }()
}();
