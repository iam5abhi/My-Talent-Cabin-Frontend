import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const Fireworks = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles

            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                    fullScreen: {
                      enable: true
                    },
                    detectRetina: true,
                    background: {
                      color: "#ffffff00"
                    },
                    fpsLimit: 60,
                    emitters: {
                      direction: "top",
                      life: {
                        count: 0,
                        duration: 0.1,
                        delay: 0.1
                      },
                      rate: {
                        delay: 0.01,
                        quantity: 1
                      },
                      size: {
                        width: 100,
                        height: 0
                      },
                      position: {
                        y: 100,
                        x: 50
                      }
                    },
                    particles: {
                      number: {
                        value: 0
                      },
                      destroy: {
                        mode: "split",
                        split: {
                          count: 1,
                          factor: { value: 1 / 3 },
                          rate: {
                            value: 100
                          },
                          particles: {
                            color: {
                              value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
                            },
                            stroke: {
                              width: 0
                            },
                            number: {
                              value: 0
                            },
                            collisions: {
                              enable: false
                            },
                            opacity: {
                              value: 1,
                              animation: {
                                enable: true,
                                speed: 0.6,
                                minimumValue: 0.1,
                                sync: false,
                                startValue: "max",
                                destroy: "min"
                              }
                            },
                            shape: {
                              type: "circle"
                            },
                            size: {
                              value: { min: 2, max: 3 },
                              animation: {
                                enable: false
                              }
                            },
                            life: {
                              count: 1,
                              duration: {
                                value: {
                                  min: 1,
                                  max: 2
                                }
                              }
                            },
                            move: {
                              enable: true,
                              gravity: {
                                enable: false
                              },
                              speed: 2,
                              direction: "none",
                              random: true,
                              straight: false,
                              outMode: "destroy"
                            }
                          }
                        }
                      },
                      life: {
                        count: 1
                      },
                      shape: {
                        type: "line"
                      },
                      size: {
                        value: { min: 1, max: 100 },
                        animation: {
                          enable: true,
                          sync: true,
                          speed: 150,
                          startValue: "random",
                          destroy: "min"
                        }
                      },
                      stroke: {
                        color: {
                          value: "#303030"
                        },
                        width: 1
                      },
                      rotate: {
                        path: true
                      },
                      move: {
                        enable: true,
                        gravity: {
                          acceleration: 15,
                          enable: true,
                          inverse: true,
                          maxSpeed: 100
                        },
                        speed: { min: 10, max: 20 },
                        outModes: {
                          default: "destroy",
                          top: "none"
                        },
                        trail: {
                          fillColor: "#ffffff00",
                          enable: true,
                          length: 10
                        }
                      }
                    }
                }}
        />
    );
};
export default Fireworks