/*
        var words = lexicon.get(); //map((x,i) => (!x === null && x.a.type)?console.log(x.a.type.e, x.a.f) : console.log('Something is wrong!'));
        var feats1 = [];
        feats1 = feats1.concat(words[0].a.f);
        feats1 = feats1.concat(words[1].a.f);
        feats1 = feats1.concat(words[2].a.f);
        var feats2 = words[3].a.f;
        var featsSet1 = new Set(feats1);
        var featsSet2 = new Set(feats2);

        let intersection = new Set(
            [...featsSet1].filter(x => featsSet2.has(x)));

        let difference = new Set(
            [...featsSet2].filter(x => !featsSet1.has(x)));

        console.log(intersection);
        console.log(difference);
        console.log('=====================================================================================');
        console.log(words[0].a.type.e);
        console.log(words[0].a.f);
        console.log(words[1].a.type.e);
        console.log(words[1].a.f);
        console.log(words[2].a.type.e);
        console.log(words[2].a.f);
        console.log(words[3].a.type.e);
        console.log(words[3].a.f);
        console.log('=====================================================================================');*/

        <div style={{paddingBottom: '15px', "font-size": '200%', "font-weight": 'bold', "color": 'blue', align: 'center'}}>Part of Speech Features</div>

        <table className="featTable" style={{width:"75%"}}>
        <tr className="paddingBottomTR" style={{fontVariant: 'small-caps'}}>
        <td></td><th className="surveyTd" style={{align: "center"}} >case</th><th className="surveyTd">person</th><th className="surveyTd">number</th><th className="surveyTd">agreement</th><th className="surveyTd">verb form</th><th className="surveyTd">auxiliary</th><th className="surveyTd">form</th>
        </tr>
        <tbody>
        <tr className="paddingBottomTR">
            <td style={{color:'brown'}}>feature of:
            </td>
            <td style={{color:'brown', textAlign: 'center'}}><input type="checkbox" name="n" value="n"/> n
                <input type="checkbox" name="n" value="d" style={{marginLeft:"10px"}}/> d
                <input type="checkbox" name="n" value="a" style={{marginLeft:"10px"}}/> a
            </td>
            <td style={{color:'brown'}}><input type="checkbox" name="n" value="n" /> n
                <input type="checkbox" name="n" value="v" style={{marginLeft:"10px"}}/> v
                <input type="checkbox" name="n" value="d" style={{marginLeft:"10px"}}/> d
                <input type="checkbox" name="n" value="a" style={{marginLeft:"10px"}}/> a
            </td>
            <td style={{color:'brown'}}><input type="checkbox" name="n" value="n" /> n
                <input type="checkbox" name="n" value="v" style={{marginLeft:"10px"}}/> v
                <input type="checkbox" name="n" value="d" style={{marginLeft:"10px"}}/> d
                <input type="checkbox" name="n" value="a" style={{marginLeft:"10px"}}/> a
            </td>
            <td style={{color:'brown'}}><input type="checkbox" name="n" value="n" /> n
                <input type="checkbox" name="n" value="v" style={{marginLeft:"10px"}}/> v
                <input type="checkbox" name="n" value="d" style={{marginLeft:"10px"}}/> d
                <input type="checkbox" name="n" value="a" style={{marginLeft:"10px"}}/> a
            </td>
            <td style={{color:'brown'}}><input type="checkbox" name="n" value="v" /> v
            </td>
            <td style={{color:'brown'}}><input type="checkbox" name="n" value="v" /> v
            </td>
            <td style={{color:'brown'}}><input type="checkbox" name="n" value="n" /> p
                <input type="checkbox" name="n" value="v" style={{marginLeft:"10px"}}/> n
            </td>
        </tr>
        <tr className="surveyTr" style={{marginTop: '50px', color:'green'}}>
            <td>possible values:</td>
            <td><input type="checkbox" className="checkbox" name="name" /> nom</td>
            <td><input type="checkbox" className="checkbox" name="name" /> first</td>
            <td><input type="checkbox" className="checkbox" name="name" /> singular</td>
            <td><input type="checkbox" className="checkbox" name="name" /> 1s</td>
            <td><input type="checkbox" className="checkbox" name="name" /> finite</td>
            <td><input type="checkbox" className="checkbox" name="name" /> plus</td>
        </tr>
        <tr className="surveyTr" style={{color:'green'}}>
            <td></td>
            <td><input type="checkbox" className="checkbox" name="name" /> acc</td>
            <td><input type="checkbox" className="checkbox" name="name" /> second</td>
            <td><input type="checkbox" className="checkbox" name="name" /> plural</td>
            <td><input type="checkbox" className="checkbox" name="name" /> 2s</td>
            <td><input type="checkbox" className="checkbox" name="name" /> base</td>
            <td><input type="checkbox" className="checkbox" name="name" /> minus</td>
        </tr>
        <tr style={{color:'green'}}>
            <td></td>
            <td> </td>
            <td><input type="checkbox" className="checkbox" name="name" /> third</td>
            <td> </td>
            <td><input type="checkbox" className="checkbox" name="name" /> 3s</td>
            <td><input type="checkbox" className="checkbox" name="name" /> presp</td>
            <td> </td>
        </tr>
        <tr style={{color:'green'}}>
            <td></td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td><input type="checkbox" className="checkbox" name="name" /> 1p</td>
            <td><input type="checkbox" className="checkbox" name="name" /> pastp</td>
            <td> </td>
        </tr>
        <tr style={{color:'green'}}>
            <td></td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td><input type="checkbox" className="checkbox" name="name" /> 2p</td>
            <td> </td>
            <td> </td>
        </tr>
        <tr className="paddingBottomTR" style={{color:'green'}}>
            <td></td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td><input type="checkbox" className="checkbox" name="name" /> 3p</td>
            <td> </td>
            <td> </td>
        </tr>
        <tr style={{fontVariant: 'small-caps'}}>
            <td>feature name</td><td className="surveyTd" >case</td><td className="surveyTd">per</td><td className="surveyTd">num</td><td className="surveyTd">agr</td><td className="surveyTd">vform</td><td className="surveyTd">aux</td>
        </tr>



        </tbody>
        </table>


        <div style={{marginTop:'30px', "font-size": '200%', "font-weight": 'bold', "color": 'blue' }}>Sign Features</div>

        <table className="featTable" style={{width:"75%"}}>
        <tr className="surveyTr" style={{fontVariant: 'small-caps'}}>
        <td></td>
        <td className="surveyTd" >phonology</td>
        <td className="surveyTd">head-dtr</td>
        <td className="surveyTd">non-head-dtr</td>
        <td className="surveyTd">[add feature]</td>
        <td className="surveyTd">[add feature]</td>
        <td className="surveyTd">[add feature]</td>
        </tr>
        <tbody>
        <tr className="surveyTr" style={{color:'brown'}}>
            <td>feature of</td>
            <td style={{color:'brown'}}>    <input type="radio" name="phon" value="sign" checked /> sign
            </td>
            <td style={{color:'brown'}}>    <input type="radio" name="head-dtr" value="phrase" checked /> phrase
            </td>
            <td style={{color:'brown'}}>    <input type="radio" name="non-head-dtr" value="phrase" checked /> phrase
            </td>
            <td style={{color:'brown'}}>    <input type="radio" name="addfeat1" value="phrase"  /> word
                <input type="radio" name="addfeat1" value="phrase"  style={{marginLeft:"10px"}}/> phrase
                <input type="radio" name="addfeat1" value="phrase" checked style={{marginLeft:"10px"}}/> sign
            </td>
            <td style={{color:'brown'}}>    <input type="radio" name="addfeat2" value="phrase"  /> word
                <input type="radio" name="addfeat2" value="phrase"  style={{marginLeft:"10px"}}/> phrase
                <input type="radio" name="addfeat2" value="phrase" checked style={{marginLeft:"10px"}}/> sign
            </td>
            <td style={{color:'brown'}}>    <input type="radio" name="addfeat3" value="phrase"  /> word
                <input type="radio" name="addfeat3" value="phrase"  style={{marginLeft:"10px"}}/> phrase
                <input type="radio" name="addfeat3" value="phrase" checked style={{marginLeft:"10px"}}/> sign
            </td>
        </tr>
        </tbody>
        </table>


        <div style={{marginTop:'30px', "font-size": '200%', "font-weight": 'bold', "color": 'blue' }}>Valence Features</div>

        <table className="featTable" style={{width:"75%"}}>
            <tr className="surveyTr" style={{fontVariant: 'small-caps'}}>
                <td></td>
                <td className="surveyTd" >subject</td>
                <td className="surveyTd">specifier</td>
                <td className="surveyTd">complements</td>
            </tr>
            <tbody>
            <tr className="surveyTr" style={{color:'brown'}}>
            <td>feature of</td>
            <td> <input type="text" /></td>
            <td> <input type="text" /></td>
            <td> <input type="text" /></td>
            </tr>
        </tbody>
        </table>




        <div style={{marginButtom:'30px', marginTop:'40px', "font-size": '200%', "font-weight": 'bold', "color": 'blue' }}>Parts of speech</div>

        <table id="headFTable" style={{width:"70%"}}>
            <tr style={{marginTop:'25px'}}>
                <td style={{width:"15%", marginButtom:'20px', "font-size": '120%', "font-weight": 'bold', "color": 'blue'}}>POS</td><td style={{width:"85%", marginButtom:'20px', "font-size": '120%', "font-weight": 'bold', "color": 'blue'}}>Features</td>
            </tr>
            <tbody>
            <tr style={{marginBottom:"40px"}}><td>noun</td>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> case</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> person</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> number</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> agreement</pre>
            </tr>
            <tr style={{marginBottom:"40px"}}><td>verb</td>
            <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> person</pre>
            <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> number</pre>
            <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> agreement</pre>
            <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> verb form</pre>
            <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> auxiliary</pre>
            </tr>
            <tr style={{marginBottom:"40px"}}><td>adjective</td>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> case</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> person</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> number</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> agreement</pre>
            </tr>
            <tr style={{marginBottom:"30px"}}><td>preposition</td>
            <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> form</pre>
            </tr>
            <tr style={{marginBottom:"40px"}}><td>determiner</td>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> case</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> person</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> number</pre>
                <pre style={{"font-size": '120%'}}><input type="checkbox" className="checkbox" name="name" style={{marginRight:"5px"}}/> agreement</pre>
            </tr>
            <tr style={{marginBottom:"30px"}}><td>adverb</td><td> </td></tr>
            <tr style={{marginBottom:"30px"}}><td>complementizer</td><td> </td></tr>
            </tbody>
        </table>

        <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
        </select>*/